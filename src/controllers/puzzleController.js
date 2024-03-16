const express = require('express');
const router = express.Router();
const Puzzle = require('../models/Puzzle');
const { sanitize_puzzles_limit, sanitize_rating_range } = require('../util/sanitize');
// Available routes
router.get('/', (req, res) => {
  res.json({
    availableRoutes: [
      {
        method: 'GET',
        path: '/',
        description: 'Get available routes'
      },
      {
        method: 'GET',
        path: '/puzzles',
        description: 'Get all puzzles, limited to 100'
      },
      {
        method: 'GET',
        path: '/puzzles/:id',
        description: 'Get a single puzzle by ID'
      },
      {
        method: 'GET',
        path: '/puzzles/rating/:min/:max',
        description: 'Get puzzles in a specific rating range'
      }
    ]
  });
});

// Get all puzzles
router.get('/puzzles', async (req, res) => {
  try {
    const limit = sanitize_puzzles_limit(req.query.limit);
    const puzzles = await Puzzle.find().limit(limit);
    res.json(puzzles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' + error });
  }
});

// Get a single puzzle by ID
router.get('/puzzles/:id', async (req, res) => {
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
router.get('/puzzles/rating/:min/:max', async (req, res) => {
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
