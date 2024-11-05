const mongoose = require('mongoose');

const businessSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a business name']
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessType',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Business', businessSchema); 