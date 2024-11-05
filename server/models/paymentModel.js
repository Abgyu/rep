const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Business'
    },
    amount: {
        type: Number,
        required: [true, 'Please add amount']
    },
    paymentMethod: {
        type: String,
        required: [true, 'Please add payment method'],
        enum: ['Cash', 'Bank Transfer', 'Mobile Money']
    },
    paymentStatus: {
        type: String,
        required: [true, 'Please add payment status'],
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    transactionId: {
        type: String,
        unique: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    receiptNumber: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema); 