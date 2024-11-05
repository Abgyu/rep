const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getBusinesses,
    getBusiness,
    createBusiness,
    updateBusiness,
    deleteBusiness
} = require('../controllers/businessController');

router.route('/')
    .get(getBusinesses)
    .post(protect, createBusiness);

router.route('/:id')
    .get(getBusiness)
    .put(protect, updateBusiness)
    .delete(protect, deleteBusiness);

module.exports = router;