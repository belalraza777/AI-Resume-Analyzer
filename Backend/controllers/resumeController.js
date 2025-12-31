const Resume = require('../models/Resume');
const path = require('path');

// Upload resume and save to database
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Determine file type from extension
    const ext = path.extname(req.file.originalname).toLowerCase();
    const fileType = ext === '.pdf' ? 'pdf' : 'docx';

    // Create resume record in database
    const resume = await Resume.create({
      userId: req.user.id, // From auth middleware
      filePath: req.file.path,
      originalName: req.file.originalname,
      fileType: fileType,
    });

    res.status(201).json({
      success: true,
      message: 'Resume uploaded successfully',
      data: resume._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadResume,
};
