const CertificateTemplate = require("../model/CertificateTemplate");
const fs = require("fs");
const path = require("path");

// Upload a new Template
exports.uploadTemplate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file provided" });
    }

    const serverUrl = process.env.SERVER_URL;
    // Construct the full URL. Assumes Config/multer.js saves to 'uploads/images'
    const imageUrl = `${serverUrl}/uploads/images/${req.file.filename}`;

    // Use provided name or fallback to filename
    const name = req.body.name || req.file.originalname;

    const newTemplate = await CertificateTemplate.create({
      name,
      imageUrl
    });

    res.status(201).json({ success: true, data: newTemplate });
  } catch (error) {
    console.error("Upload Template Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Templates
exports.getAllTemplates = async (req, res) => {
  try {
    const templates = await CertificateTemplate.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: templates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Template
exports.deleteTemplate = async (req, res) => {
  try {
    const template = await CertificateTemplate.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ success: false, message: "Template not found" });
    }

    // Extract filename from the URL to delete from disk
    const filename = template.imageUrl.split('/').pop();
    // Adjust path if your folder structure is different
    const filePath = path.join(__dirname, "../uploads/images", filename);

    // Check if file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await CertificateTemplate.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
