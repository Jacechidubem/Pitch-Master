const mongoose = require('mongoose');

const coachSchema = mongoose.Schema({
  name: { type: String, required: true },
  style: { type: String },
  nationality: { type: String },
  bonus: { type: String },
  image: { type: String }
});

module.exports = mongoose.model('Coach', coachSchema);