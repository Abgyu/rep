const City = require('../models/cityModel');

// @desc    Get all cities
// @route   GET /api/cities
const getCities = async (req, res) => {
    try {
        const cities = await City.find();
        res.json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single city
// @route   GET /api/cities/:id
const getCity = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.json(city);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new city
// @route   POST /api/cities
const createCity = async (req, res) => {
    try {
        const city = await City.create(req.body);
        res.status(201).json(city);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update city
// @route   PUT /api/cities/:id
const updateCity = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        const updatedCity = await City.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedCity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete city
// @route   DELETE /api/cities/:id
const deleteCity = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        await city.remove();
        res.json({ message: 'City removed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getCities,
    getCity,
    createCity,
    updateCity,
    deleteCity
}; 