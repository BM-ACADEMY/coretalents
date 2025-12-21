const transporter = require("../Config/emailConfig");
const { brochureRequestTemplate } = require("../Templates/emailTemplates");

const sendBrochureRequest = async (req, res) => {
  try {
    const { name, email, purpose } = req.body;

    // Validation
    if (!name || !email || !purpose) {
      return res.status(400).json({ message: "Name, email, and purpose are required!" });
    }

    // Prepare Email Options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${process.env.EMAIL_USER}, ${process.env.CEO_EMAIL}`,
      subject: `📩 New Brochure Download Request from ${name}`,
      html: brochureRequestTemplate(name, email, purpose), // Use the template
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Brochure request sent successfully!" });
  } catch (error) {
    console.error("Email Controller Error:", error);
    res.status(500).json({ message: "Failed to send request.", error: error.message });
  }
};

module.exports = { sendBrochureRequest };
