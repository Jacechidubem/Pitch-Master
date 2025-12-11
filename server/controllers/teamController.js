const Team = require('../models/Team');

// @desc    Create a new team
// @route   POST /api/teams
// @access  Private
const createTeam = async (req, res) => {
  try {
    const { name, formation, players , coach} = req.body;

    if (!name || !players || players.length === 0) {
      return res.status(400).json({ message: 'Please add a name and at least one player' });
    }

    const team = await Team.create({
      user: req.user.id, // We get this from the auth middleware
      name,
      formation,
      coach,
      players,
    });

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's teams
// @route   GET /api/teams
// @access  Private
const getMyTeams = async (req, res) => {
  try {
    const teams = await Team.find({ user: req.user.id }).populate('players.player');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete team
// @route   DELETE /api/teams/:id
// @access  Private
const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if user owns the team
    if (team.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await team.deleteOne();

    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Update existing team
// @route   PUT /api/teams/:id
// @access  Private
const updateTeam = async (req, res) => {
  try {
    const { name, formation, players, coach } = req.body;
    const team = await Team.findById(req.params.id);

    if (!team) return res.status(404).json({ message: 'Team not found' });

    // Check ownership
    if (team.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    team.name = name || team.name;
    team.formation = formation || team.formation;
    team.players = players || team.players;
    team.coach = coach || team.coach;

    const updatedTeam = await team.save();
    res.json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single team by ID
// @route   GET /api/teams/:id
// @access  Private
const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('players.player');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTeam, getMyTeams, deleteTeam, updateTeam, getTeamById };

