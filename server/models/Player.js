const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true }, // e.g., 'FWD', 'MID', 'DEF', 'GK'
  team: { type: String, required: true },     // e.g., 'Manchester City'
  nationality: { type: String },
  rating: { type: Number, required: true },   // Overall rating (e.g., 91)
  image: { type: String },                    // URL to player image
  attributes: {
    pace: Number,
    shooting: Number,
    passing: Number,
    dribbling: Number,
    defending: Number,
    physical: Number,
    vision: Number, // <--- NEW ATTRIBUTE
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Player', playerSchema);