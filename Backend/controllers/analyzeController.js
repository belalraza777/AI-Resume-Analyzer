const Resume = require('../models/Resume');
const Report = require('../models/Report');
const { analyzeResumeWithAI } = require('../utils/aiClient');


// analyze Resume report for uploaded resume
const analyzeResume = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const resumeId = req.params.id;
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        const existingReport = await Report.findOne({ resumeId });
        if (existingReport) {
            return res.status(200).json({
                success: true,
                message: 'Resume Report already found',
                data: existingReport,
            });
        }

        // Use extracted text from Resume record (extracted during upload)
        const resumeText = resume.extractedText || '';
        if (!resumeText) {
            return res.status(400).json({ 
                error: 'Resume text not available. Please re-upload the resume.' 
            });
        }

        const analysis = await analyzeResumeWithAI(resumeText);

        const newReport = new Report({
            userId: req.user.id,
            resumeId,
            atsScore: analysis?.atsScore,
            skillsFound: [...(analysis?.skillsFound || [])],
            skillsMissing: [...(analysis?.skillsMissing || [])],
            summary: analysis?.summary,
            suggestions: analysis?.suggestions,
        });

        const report = await newReport.save();
        console.log(report);

        res.status(201).json({
            success: true,
            message: 'Resume analyzed successfully',
            data: report,
        });
    } catch (err) {
        console.error('analyzeResume error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// get all analyzed Resume reports
const allAnalyzeResume = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const reports = await Report.find({ userId: req.user.id }).lean();
        res.status(200).json({
            success: true,
            message: 'Analyzed resumes fetched successfully',
            data: reports,
        });
    } catch (err) {
        console.error('allAnalyzeResume error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
};

// delete analyzed Resume
const deleteAnalyzeResume = async (req, res) => {
    try {
        const resumeId = req.params.id;
        if(!resumeId){
            return res.status(404).json({ error: 'ResumeId not found' });
        }
        
        const deleteResume = await Resume.deleteOne({ _id: resumeId });
        if (!deleteResume || deleteResume.deletedCount === 0) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        const deleteReport = await Report.deleteOne({ resumeId });
        if (!deleteReport || deleteReport.deletedCount === 0) {
            return res.status(404).json({ error: 'Report not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Resume deleted successfully',
        });
    } catch (err) {
        console.error('deleteAnalyzeResume error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    analyzeResume,
    allAnalyzeResume,
    deleteAnalyzeResume,
};