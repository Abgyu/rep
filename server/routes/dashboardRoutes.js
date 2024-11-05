const express = require('express');
const router = express.Router();

// Tusaale, waxaad ku dari kartaa endpoint-yo halkan
router.get('/', (req, res) => {
    res.json({ message: "Dashboard data" });
});

module.exports = router;
