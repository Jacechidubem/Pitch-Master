const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Please add a team name'],
  },
  formation: {
    type: String,
    required: true,
  },
  // --- ADD THIS FIELD ---
  coach: {
    type: String,
    default: 'Unknown'
  },
  // ----------------------
  players: [
    {
      positionId: { type: String, required: true },
      player: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Player' 
      }
    }
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Team', teamSchema);