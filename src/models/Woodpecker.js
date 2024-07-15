const mongoose = require('mongoose');

const woodpeckerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  easy: { type: Map, of: [String], required: true },
  intermediate: { type: Map, of: [String], required: true },
  advanced: { type: Map, of: [String], required: true },
}, { collection : 'woodpecker' });

module.exports = mongoose.model('Woddpecker', woodpeckerSchema);
