// routes/dashboardRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Resume from "../models/Resume.js";
import Suggestion from "../models/Suggestion.js";

const router = express.Router();

// ✅ Middleware to check token
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// ✅ Dashboard Data Endpoint
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const totalResumes = await Resume.countDocuments({ userId: req.userId });
    const totalSuggestions = await Suggestion.countDocuments({ userId: req.userId });
    const completedProfiles = user.completedProfiles || 0;

    res.json({
      name: user.name,
      totalResumes,
      totalSuggestions,
      completedProfiles,
    });
  } catch (err) {
    console.error("Dashboard route error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Export router (ESM)
export default router;
