const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getPayments,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment
} = require('../controllers/paymentController');

router.route('/')
    .get(protect, getPayments)
    .post(protect, createPayment);

router.route('/:id')
    .get(protect, getPayment)
    .put(protect, updatePayment)
    .delete(protect, deletePayment);

module.exports = router;