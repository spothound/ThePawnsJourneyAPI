const mongoose = require('mongoose');

const puzzleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  rating: { type: Number, required: true },
}, { collection : 'puzzles' });

module.exports = mongoose.model('Puzzle', puzzleSchema);
