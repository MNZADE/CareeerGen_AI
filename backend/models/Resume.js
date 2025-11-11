import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // linked to User
    title: { type: String, required: true }, // resume title
    createdAt: { type: Date, default: Date.now }, // creation timestamp
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

export default mongoose.model("Resume", ResumeSchema);
