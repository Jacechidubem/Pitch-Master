const Player = require('../models/Player');

// @desc    Get all players (with optional search)
// @route   GET /api/players
// @access  Public
const getPlayers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: 'i', // Case insensitive
          },
        }
      : {};

    const players = await Player.find({ ...keyword });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPlayers };