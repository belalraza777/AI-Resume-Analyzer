const fs = require("fs/promises");
const pdfParse = require("pdf-parse"); // For PDF files
const mammoth = require("mammoth"); // For DOCX files

// Extract text from resume file (PDF or DOCX)
const extractResumeText = async (filePath, fileType) => {
  try {
    const fileBuffer = await fs.readFile(filePath);

    if (fileType === "pdf") {
      const data = await pdfParse(fileBuffer);
      return cleanText(data.text);
    }

    if (fileType === "docx") {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return cleanText(result.value);
    }

    throw new Error(`Unsupported file type: ${fileType}`);
  } catch (error) {
    console.error("Resume text extraction failed:", error);
    throw error;
  }
};

const cleanText = (text) =>
  text
    .replace(/•|◦|▪|–|—/g, "-")
    .replace(/\t+/g, " ")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

module.exports = { extractResumeText };
