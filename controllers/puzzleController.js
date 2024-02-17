const express = require('express');
const router = express.Router();
const Puzzle = require('../models/puzzle');

// Get all puzzles
router.get('/puzzles', async (req, res) => {
  try {
    const puzzles = await Puzzle.find().limit(100);
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

module.exports = router;
