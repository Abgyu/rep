const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  business_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'BusinessRegistration',
    required: true 
  },
  amount: { type: Number, required: true },
  payment_method: { type: String, required: true },
  payment_status: { type: String, default: 'Pending' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);