import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ Gemini Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "models/gemini-2.5-pro"; // Or gemini-2.5-flash for faster replies

// ✅ Middleware to Verify JWT
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// ✅ Text-based Suggestion
router.post("/suggest", auth, async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ message: "No query provided" });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are CareerGen AI, a professional career coach. Provide a concise, helpful response to this query:\n\n"${query}"`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const suggestion =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No response from Gemini.";

    res.json({ suggestion });
  } catch (err) {
    console.error("❌ Gemini Suggestion Error:", err);
    res.status(500).json({ message: "Gemini request failed", error: err.message });
  }
});

// ✅ Resume/Image Analysis + Generate 30 Chat Prompts
router.post(
  "/analyze-resume",
  auth,
  upload.fields([{ name: "resume" }, { name: "image" }]),
  async (req, res) => {
    try {
      const resume = req.files["resume"]?.[0];
      const image = req.files["image"]?.[0];

      let contentPrompt = "Analyze the uploaded document and provide suggestions.";
      if (resume)
        contentPrompt += ` The resume file name is "${resume.originalname}".`;
      if (image)
        contentPrompt += ` The image file name is "${image.originalname}".`;

      // 🧠 Step 1: Analyze Resume/Image
      const analysisResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/${GEMINI_MODEL}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are CareerGen AI, a resume analysis and career expert.
Analyze this user's uploaded file(s). Identify key strengths, weaknesses, and improvement suggestions professionally.
${contentPrompt}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const analysisData = await analysisResponse.json();
      const analysisText =
        analysisData?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No detailed analysis available.";

      // 🧩 Step 2: Generate EXACTLY 30 Default Chat Suggestions
      const suggestionResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/${GEMINI_MODEL}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Based on the following resume analysis, generate **exactly 30 concise career-related questions** that the user could ask CareerGen AI.
Format each on its own numbered line (1–30). Keep them practical, diverse, and personalized for job seekers.

Resume analysis:
${analysisText}

Output example format:
1. How can I improve my resume for software engineering roles?
2. What are the best keywords to include for data analyst positions?
... up to 30 lines.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const suggestionData = await suggestionResponse.json();
      const rawSuggestions =
        suggestionData?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No chat prompts generated.";

      // ✨ Clean formatting
      const formattedSuggestions = rawSuggestions
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .slice(0, 30) // Limit to 30 lines only
        .join("\n");

      // 🧹 Cleanup temporary files
      if (resume) fs.unlinkSync(resume.path);
      if (image) fs.unlinkSync(image.path);

      // ✅ Send Combined Result
      res.json({
        analysis: `${analysisText}\n\n💬 **30 Default Career Chat Prompts:**\n${formattedSuggestions}`,
      });
    } catch (err) {
      console.error("❌ Gemini Resume Analysis Error:", err);
      res.status(500).json({
        message: "AI resume analysis failed",
        error: err.message,
      });
    }
  }
);

export default router;
