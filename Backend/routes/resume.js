const express = require('express');
const upload = require('../config/multer');
const { uploadResume } = require('../controllers/resumeController');
const verifyToken = require('../middleware/authVerify');

const router = express.Router();

// Upload resume in PDF or DOCX format
router.post('/upload', verifyToken, upload.single('resume'), uploadResume);

module.exports = router;