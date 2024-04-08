const mongoose = require('mongoose');

const testItemSchema = new mongoose.Schema({
  sessionId: String,
  word: String,
  color: String,
  correctAnswer: String,
  distractors: [String],
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const TestItem = mongoose.model('TestItem', testItemSchema);

module.exports = TestItem;
