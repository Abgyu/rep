const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add city name'],
        unique: true
    },
    state: {
        type: String,
        required: [true, 'Please add state']
    },
    country: {
        type: String,
        required: [true, 'Please add country']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('City', citySchema); 