const express = require("express");
const router = express.Router();
const resumeController = require("../Controller/resumeController");
const { verifyToken } = require("../middleware/auth"); // Assuming you have this from your snippets
const upload = require("../Config/Resumeupload");

// Route to get current user's resume
router.get("/me", verifyToken, resumeController.getMyResume);

// Route to create or update resume (handles file upload)
// Field name in frontend FormData must be 'resumeImage' or just match the input
router.post(
  "/save", 
  verifyToken,                 // 1. Auth First (creates req.user)
  upload.single("resumeImage"), // 2. Upload Second (creates req.file)
  resumeController.saveResume   // 3. Controller
);
router.delete("/me", verifyToken, resumeController.deleteResume);

module.exports = router;