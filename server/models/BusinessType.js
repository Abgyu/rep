const mongoose = require('mongoose');

const businessTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a business type name'],
        unique: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BusinessType', businessTypeSchema);