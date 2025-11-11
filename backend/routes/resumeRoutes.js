import express from "express";
import Resume from "../models/Resume.js";
const router = express.Router();

// DELETE a resume by ID
router.delete("/:id", async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: "Resume deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete resume" });
  }
});

export default router;
