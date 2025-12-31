const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authVerify');
const { analyzeResume, deleteAnalyzeResume,allAnalyzeResume } = require('../controllers/analyzeController');

// POST endpoint to analyze resume
router.get('/report', verifyToken, allAnalyzeResume);
router.post('/report/:id', verifyToken, analyzeResume);
router.delete('/report/:id', verifyToken, deleteAnalyzeResume);

module.exports = router;