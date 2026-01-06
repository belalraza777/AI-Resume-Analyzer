require("dotenv").config();

const OpenAI = require("openai");


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.API_BASE_URL || undefined, // optional override
});

// Analyze resume text using OpenAI and return structured JSON data
const analyzeResumeWithAI = async (resumeText) => {
  if (!resumeText || typeof resumeText !== "string") {
    throw new Error("resumeText must be a non-empty string");
  }

  const systemPrompt = [
    "You are an ATS resume analyzer.",
    "Return ONLY a JSON object with keys:",
    "atsScore (0-100 number), skillsFound (array of strings),",
    "skillsMissing (array of strings), summary (string), suggestions (string).",
    "Keep the JSON concise and valid. No extra text.",
  ].join(" ");

  const userPrompt = [
    "Analyze this resume and produce the JSON schema described.",
    "Resume Text:",
    resumeText,
  ].join("\n");

  try {
    const response = await openai.chat.completions.create({
      model:"gpt-4.1",
      temperature: 0.2,
      response_format: { type: "json_object" }, // forces JSON
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const raw = response.choices?.[0]?.message?.content;
    if (!raw) {
      throw new Error("No content returned from OpenAI");
    }

    return JSON.parse(raw);
  } catch (error) {
    console.error("AI analysis error:", error?.response?.data || error.message || error);
    throw error;
  }
};

module.exports = { analyzeResumeWithAI };
