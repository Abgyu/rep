const mongoose = require('mongoose');

const businessTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add business type name'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please add description']
    },
    registrationFee: {
        type: Number,
        required: [true, 'Please add registration fee']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BusinessType', businessTypeSchema); 