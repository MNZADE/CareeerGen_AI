// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    completedProfiles: { type: Number, default: 0 }, // ✅ kept your previous field
  },
  { timestamps: true } // ✅ automatically adds createdAt & updatedAt
);

const User = mongoose.model("User", userSchema);

export default User;
