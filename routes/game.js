const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

// GET
router.get('/api/v1/game', gameController.getGames);
router.get('/api/v1/game/:code_game', gameController.getGame);

// POST
router.post('/api/v1/game/create', gameController.createGame);

// PUT
router.put('/api/v1/game/player/add', gameController.addPlayer);

module.exports = router;