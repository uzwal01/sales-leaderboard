const express = require('express');
const router = express.Router();

const { addSale, getLeaderboard, getAllSales } = require('../controllers/salesController');

// POST /api/sales - Add new sale
router.post('/sales', addSale);

// GET api/leaderboard - Get ranked Leaderboard
router.get('/leaderboard', getLeaderboard);

// GET /api/sales - Get all sales
router.get('/sales', getAllSales);

module.exports = router;


