const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  totalTime: {
    type: Number, // Assuming totalTime is in seconds or a similar unit
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
