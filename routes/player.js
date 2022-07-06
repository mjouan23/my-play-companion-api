const express = require('express');
const playerController = require('../controllers/playerController');


const router = express.Router()

router.post('/api/v1/player/create', playerController.createPlayer);


module.exports = router;