const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  passport_number: { type: String, required: true },
  image: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Owner', ownerSchema);