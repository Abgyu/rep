const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add last name']
    },
    nationalId: {
        type: String,
        required: [true, 'Please add national ID'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please add phone number']
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        unique: true
    },
    address: {
        type: String,
        required: [true, 'Please add address']
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Owner', ownerSchema); 