const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, default: "" }, // Optional for Google users initially
    password: { type: String }, // Optional for Google users
    googleId: { type: String }, // To identify Google users
    avatar: { type: String }, // Store profile picture
    role: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user" 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);