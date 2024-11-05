const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getCities,
    getCity,
    createCity,
    updateCity,
    deleteCity
} = require('../controllers/cityController');

router.route('/')
    .get(getCities)
    .post(protect, createCity);

router.route('/:id')
    .get(getCity)
    .put(protect, updateCity)
    .delete(protect, deleteCity);

module.exports = router; 