const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  sessionId: String,
  testItemId: mongoose.Schema.Types.ObjectId,
  selectedAnswer: String,
  musicGenre: String,
  responseTime: Number,
  isConsistent: Boolean,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
