const express = require("express");
const router = express.Router();

const {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
} = require("../Controller/Reviewcontroller");

// Create Content
router.post("/", createContent);

// Get All Content
router.get("/", getAllContent);

// Get Single Content
router.get("/:id", getContentById);

// Update Content
router.put("/:id", updateContent);

// Delete Content
router.delete("/:id", deleteContent);

module.exports = router;
