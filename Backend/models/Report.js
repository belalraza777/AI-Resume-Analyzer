const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: [true, 'Resume ID is required'],
  },
  atsScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  skillsFound: {
    type: [String],
    default: [],
  },
  skillsMissing: {
    type: [String],
    default: [],
  },
  summary: {
    type: String,
  },
  suggestions: {
    type: String,
  }
}, {
  timestamps: true,
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
