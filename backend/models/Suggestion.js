const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  query: String,
  suggestion: String, // ✅ make sure this line exists
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Suggestion", suggestionSchema);
