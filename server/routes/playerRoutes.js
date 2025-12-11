const express = require('express');
const router = express.Router();
const { getPlayers } = require('../controllers/playerController');

router.get('/', getPlayers);

module.exports = router;