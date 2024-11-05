const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getBusinessTypes,
    getBusinessType,
    createBusinessType,
    updateBusinessType,
    deleteBusinessType
} = require('../controllers/businessTypeController');

router.route('/')
    .get(getBusinessTypes)
    .post(protect, createBusinessType);

router.route('/:id')
    .get(getBusinessType)
    .put(protect, updateBusinessType)
    .delete(protect, deleteBusinessType);

module.exports = router; 