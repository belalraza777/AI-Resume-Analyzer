require("dotenv").config(); 

const mongoose = require('mongoose');
const connectDB = require('./config/database');
const { extractResumeText } = require('./utils/textExractor');
const Resume = require('./models/Resume');
const { analyzeResumeWithAI } = require('./utils/aiClient');

const runExample = async () => {
    try {
        await connectDB();

        const resume = await Resume.findById('6940f3c862144c08dbd856fc'); // Update with a real ID in your DB
        if (!resume) {
            throw new Error('Resume not found; update the ID to an existing document');
        }

        const pdfText = await extractResumeText(resume.filePath, resume.fileType);
        console.log('Extracted PDF Text:', pdfText);
        const analysis = await analyzeResumeWithAI(pdfText);
        console.log('AI Analysis Result:', analysis.atsScore);

    } catch (error) {
        console.error('Error during text extraction:', error);
    } finally {
        await mongoose.connection.close();
    }
};

runExample();