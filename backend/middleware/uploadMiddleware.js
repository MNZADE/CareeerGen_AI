// middleware/uploadMiddleware.js
const multer = require("multer");
const path = require("path");

// Store uploads in /uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File filter (only PDF or DOC/DOCX)
const fileFilter = (req, file, cb) => {
  const allowed = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error("Only PDF and Word documents allowed!"), false);
};

module.exports = multer({ storage, fileFilter });
