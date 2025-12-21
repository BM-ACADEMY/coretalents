const express = require("express");
const router = express.Router();
const { sendBrochureRequest } = require("../Controller/emailController");

// Route: POST /api/email/send-brochure
router.post("/send-brochure", sendBrochureRequest);

module.exports = router;
