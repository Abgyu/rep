const Business = require('../models/businessModel');

// @desc    Get all businesses
// @route   GET /api/businesses
const getBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find()
            .populate('type')
            .populate('owner')
            .populate('city');
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single business
// @route   GET /api/businesses/:id
const getBusiness = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id)
            .populate('type')
            .populate('owner')
            .populate('city');
        
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        
        res.json(business);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new business
// @route   POST /api/businesses
const createBusiness = async (req, res) => {
    try {
        const business = await Business.create(req.body);
        res.status(201).json(business);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update business
// @route   PUT /api/businesses/:id
const updateBusiness = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        const updatedBusiness = await Business.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        res.json(updatedBusiness);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete business
// @route   DELETE /api/businesses/:id
const deleteBusiness = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        await business.remove();
        res.json({ message: 'Business removed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getBusinesses,
    getBusiness,
    createBusiness,
    updateBusiness,
    deleteBusiness,
}; 