import Resume from "../models/Resume.js";

// ✅ Create new resume
export const createResume = async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    await newResume.save();
    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({ message: "Error creating resume", error });
  }
};

// ✅ Get all resumes by user
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resumes", error });
  }
};

// ✅ Update resume (when user edits)
export const updateResume = async (req, res) => {
  try {
    const updated = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating resume", error });
  }
};

// ✅ Delete resume
export const deleteResume = async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting resume", error });
  }
};

