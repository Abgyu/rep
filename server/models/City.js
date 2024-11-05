const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('City', citySchema);