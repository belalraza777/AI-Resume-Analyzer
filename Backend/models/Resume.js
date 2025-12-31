const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  filePath: {
    type: String,
    required: [true, 'File path is required'],
  },
  originalName: {
    type: String,
    required: [true, 'Original filename is required'],
  },
  fileType: {
    type: String,
    enum: ['pdf', 'docx'],
    required: [true, 'File type is required'],
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
