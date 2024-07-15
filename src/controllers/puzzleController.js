const express = require('express');
const router = express.Router();
const Puzzle = require('../models/Puzzle');
const { sanitize_puzzles_limit, sanitize_rating_range } = require('../util/sanitize');

// Get all puzzles
router.get('/', async (req, res) => {
  try {
    const limit = sanitize_puzzles_limit(req.query.limit);
    const puzzles = await Puzzle.find().limit(limit);
    res.json(puzzles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' + error });
  }
});

// Get a single puzzle by ID
router.get('/:id', async (req, res) => {
  try {
    const puzzle = await Puzzle.findOne({
      PuzzleId: req.params.id,
    }).exec();
    if (!puzzle) {
      return res.status(404).json({ error: 'Puzzle not found' });
    }
    res.json(puzzle);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' + error });
  }
});

// Get puzzles in a specific rating range
router.get('/rating/:min/:max', async (req, res) => {
  try {
    const {min, max} = sanitize_rating_range(req.params.min, req.params.max);
    const limit = sanitize_puzzles_limit(req.query.limit);
    const puzzles = await Puzzle.aggregate([
      {
        $match: {
          Rating: {
            $gte: min,
            $lte: max
          },
        }
      },
      { $sample: { size: limit } }
    ]);
    res.json(puzzles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' + error });
  }
});

module.exports = router;
