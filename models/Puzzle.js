const mongoose = require('mongoose');

const puzzleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model('Puzzle', puzzleSchema);
