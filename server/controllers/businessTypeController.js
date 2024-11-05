const BusinessType = require('../models/businessTypeModel');

// @desc    Get all business types
// @route   GET /api/business-types
const getBusinessTypes = async (req, res) => {
    try {
        const businessTypes = await BusinessType.find();
        res.json(businessTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single business type
// @route   GET /api/business-types/:id
const getBusinessType = async (req, res) => {
    try {
        const businessType = await BusinessType.findById(req.params.id);
        if (!businessType) {
            return res.status(404).json({ message: 'Business type not found' });
        }
        res.json(businessType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new business type
// @route   POST /api/business-types
const createBusinessType = async (req, res) => {
    try {
        const businessType = await BusinessType.create(req.body);
        res.status(201).json(businessType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update business type
// @route   PUT /api/business-types/:id
const updateBusinessType = async (req, res) => {
    try {
        const businessType = await BusinessType.findById(req.params.id);
        if (!businessType) {
            return res.status(404).json({ message: 'Business type not found' });
        }
        const updatedBusinessType = await BusinessType.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedBusinessType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete business type
// @route   DELETE /api/business-types/:id
const deleteBusinessType = async (req, res) => {
    try {
        const businessType = await BusinessType.findById(req.params.id);
        if (!businessType) {
            return res.status(404).json({ message: 'Business type not found' });
        }
        await businessType.remove();
        res.json({ message: 'Business type removed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getBusinessTypes,
    getBusinessType,
    createBusinessType,
    updateBusinessType,
    deleteBusinessType
}; 