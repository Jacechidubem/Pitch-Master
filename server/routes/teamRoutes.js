const express = require('express');
const router = express.Router();
const { createTeam, getMyTeams , deleteTeam, updateTeam, getTeamById } = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware'); // Security Guard

// All team routes are protected (must be logged in)
router.post('/', protect, createTeam);
router.get('/', protect, getMyTeams);
router.delete('/:id', protect, deleteTeam);
router.put('/:id', protect, updateTeam); // Update
router.get('/:id', protect, getTeamById); // Get Single Team

module.exports = router;