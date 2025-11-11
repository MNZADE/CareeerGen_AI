// routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

// POST: /api/ai/analyze-job-match
router.post("/analyze-job-match", upload.single("resume"), async (req, res) => {
  try {
    const { jobRole, jobDescription } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ error: "No resume file uploaded" });
    }

    // Simulated AI logic 🧠
    // (In a real app, you’d use OpenAI API or NLP model here)
    const atsScoreValue = Math.floor(Math.random() * 20) + 80; // 80–99%
    const jobMatchScore = Math.floor(Math.random() * 30) + 60; // 60–90%

    // Example suggestions
    const suggestions = [
      "Add measurable achievements (e.g., 'Improved efficiency by 25%').",
      "Include more keywords related to the job description.",
      "Use a modern, ATS-friendly resume format.",
      "Highlight tools and technologies like Python, SQL, or React.",
      "Add a Certifications or Skills section for better keyword matching.",
    ];

    // Identify missing keywords (simple keyword match simulation)
    const requiredKeywords = ["Python", "Leadership", "Project", "Teamwork", "Communication"];
    const missingKeywords = requiredKeywords.filter(
      (word) => !jobDescription.toLowerCase().includes(word.toLowerCase())
    );

    // Dynamic feedback based on score
    const atsLabel =
      atsScoreValue >= 85
        ? "🟢 Excellent - ATS Friendly"
        : atsScoreValue >= 70
        ? "🟡 Good - Minor Improvements Needed"
        : "🔴 Needs Work - Format or Keywords Missing";

    const jobMatchLabel =
      jobMatchScore >= 80
        ? "🟢 Strong Match"
        : jobMatchScore >= 65
        ? "🟡 Moderate Match"
        : "🔴 Low Match";

    res.json({
      atsScoreValue,
      jobMatchScore,
      atsLabel,
      jobMatchLabel,
      missingKeywords,
      suggestions,
    });
  } catch (error) {
    console.error("AI Analysis Error:", error);
    res.status(500).json({ error: "Server Error. Try again later." });
  }
});

module.exports = router;
