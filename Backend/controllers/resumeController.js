const Resume = require('../models/Resume');
const path = require('path');
const fs = require('fs/promises');
const { extractResumeText } = require('../utils/textExtractor');

// Upload resume, extract text immediately, save to database, and delete file
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Determine file type from extension
    const ext = path.extname(req.file.originalname).toLowerCase();
    const fileType = ext === '.pdf' ? 'pdf' : 'docx';
    const filePath = req.file.path;

    let extractedText = '';
    try {
      // Extract text immediately from uploaded file
      extractedText = await extractResumeText(filePath, fileType);
    } catch (extractError) {
      // Delete file if extraction fails
      try {
        await fs.unlink(filePath);
      } catch (deleteError) {
        console.error('Failed to delete file after extraction error:', deleteError);
      }
      return res.status(400).json({ 
        error: 'Failed to extract text from resume. Please ensure the file is valid and try again.' 
      });
    }

    // Create resume record in database with extracted text
    const resume = await Resume.create({
      userId: req.user.id, // From auth middleware
      filePath: filePath, // Keep for reference, but file will be deleted
      originalName: req.file.originalname,
      fileType: fileType,
      extractedText: extractedText,
    });

    // Delete the file from disk now that text is extracted and stored
    try {
      await fs.unlink(filePath);
    } catch (deleteError) {
      console.error('Failed to delete uploaded file:', deleteError);
      // Don't fail the upload if file deletion fails, just log it
    }

    res.status(201).json({
      success: true,
      message: 'Resume uploaded successfully',
      data: resume._id
    });
  } catch (error) {
    // Attempt to clean up the file if any database error occurs
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (deleteError) {
        console.error('Failed to delete file after database error:', deleteError);
      }
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadResume,
};
