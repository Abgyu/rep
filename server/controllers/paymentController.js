const Payment = require('../models/paymentModel');
const Business = require('../models/businessModel');

// @desc    Get all payments
// @route   GET /api/payments
const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate({
                path: 'business',
                populate: {
                    path: 'owner type city'
                }
            });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single payment
// @route   GET /api/payments/:id
const getPayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate({
                path: 'business',
                populate: {
                    path: 'owner type city'
                }
            });

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new payment
// @route   POST /api/payments
const createPayment = async (req, res) => {
    try {
        // Check if business exists
        const business = await Business.findById(req.body.business);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        // Generate receipt number
        const receiptNumber = 'RCP' + Date.now();

        // Create payment with receipt number
        const payment = await Payment.create({
            ...req.body,
            receiptNumber,
            transactionId: 'TXN' + Date.now()
        });

        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update payment
// @route   PUT /api/payments/:id
const updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        const updatedPayment = await Payment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate({
            path: 'business',
            populate: {
                path: 'owner type city'
            }
        });

        res.json(updatedPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete payment
// @route   DELETE /api/payments/:id
const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        await payment.deleteOne();
        res.json({ message: 'Payment removed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getPayments,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment
}; 