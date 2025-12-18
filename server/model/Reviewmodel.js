const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    work: {  // Changed from 'role' to 'work'
      type: String,
      trim: true,  // No default, optional string
    },
  },
  { timestamps: true }
);

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;