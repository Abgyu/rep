const mongoose = require('mongoose');

const businessRegistrationSchema = new mongoose.Schema({
  business_name: { type: String, required: true },
  business_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessType' },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
  city_id: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  full_address: { type: String, required: true },
  description: String,
  payment_status: { type: Boolean, default: false },
  status: { type: String, default: 'Pending' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BusinessRegistration', businessRegistrationSchema);