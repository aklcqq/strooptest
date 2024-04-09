const mongoose = require('mongoose');

const testItemSchema = new mongoose.Schema({
  sessionId: String,
  word: String,
  color: String,
  correctAnswer: String,
  distractors: [String],
  createdAt: { type: Date, default: Date.now },
});

const responseSchema = new mongoose.Schema({
  sessionId: String,
  testItemId: String,
  selectedAnswer: String,
  musicGenre: String,
  responseTime: Number,
  isConsistent: Boolean,
  createdAt: { type: Date, default: Date.now },
});

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
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // Add any other fields as necessary
  });

const Session = mongoose.model('Session', sessionSchema);

const TestItem = mongoose.model('TestItem', testItemSchema);
const Response = mongoose.model('Response', responseSchema);

module.exports = { TestItem, Response, Session };
