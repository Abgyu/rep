const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getOwners,
    getOwner,
    createOwner,
    updateOwner,
    deleteOwner
} = require('../controllers/ownerController');

router.route('/')
    .get(getOwners)
    .post(protect, createOwner);

router.route('/:id')
    .get(getOwner)
    .put(protect, updateOwner)
    .delete(protect, deleteOwner);

module.exports = router;