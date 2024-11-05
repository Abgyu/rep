const Owner = require('../models/ownerModel');

// @desc    Get all owners
// @route   GET /api/owners
const getOwners = async (req, res) => {
    try {
        const owners = await Owner.find();
        res.json(owners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single owner
// @route   GET /api/owners/:id
const getOwner = async (req, res) => {
    try {
        const owner = await Owner.findById(req.params.id);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }
        res.json(owner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new owner
// @route   POST /api/owners
const createOwner = async (req, res) => {
    try {
        const owner = await Owner.create(req.body);
        res.status(201).json(owner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update owner
// @route   PUT /api/owners/:id
const updateOwner = async (req, res) => {
    try {
        const owner = await Owner.findById(req.params.id);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }
        const updatedOwner = await Owner.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedOwner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete owner
// @route   DELETE /api/owners/:id
const deleteOwner = async (req, res) => {
    try {
        const owner = await Owner.findById(req.params.id);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }
        await owner.remove();
        res.json({ message: 'Owner removed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getOwners,
    getOwner,
    createOwner,
    updateOwner,
    deleteOwner
}; 