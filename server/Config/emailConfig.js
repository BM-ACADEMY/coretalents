const nodemailer = require("nodemailer");
require("dotenv").config();

// Create Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in", // Change to smtp.zoho.com if outside India
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Server ready to send emails");
  }
});

module.exports = transporter;
