const CertificateTemplate = require("../model/CertificateTemplate");
const Certificate = require("../model/Certificate");
const fs = require("fs");
const path = require("path");

// Upload a new Template
exports.uploadTemplate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file provided" });
    }

    const serverUrl = process.env.SERVER_URL;
    const imageUrl = `${serverUrl}/uploads/images/${req.file.filename}`;
    const name = req.body.name || req.file.originalname.split('.')[0];

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

// ✅ NEW: Update Template (Supports Name & Image Change)
exports.updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    let template = await CertificateTemplate.findById(id);
    if (!template) {
      return res.status(404).json({ success: false, message: "Template not found" });
    }

    // 1. Update Name if provided
    if (name) template.name = name;

    // 2. Update Image if a new file is uploaded
    if (req.file) {
      // Attempt to delete the old image file to save server space
      try {
        if (template.imageUrl) {
          const oldFilename = template.imageUrl.split('/').pop();
          const oldFilePath = path.join(__dirname, "../uploads/images", oldFilename);
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }
      } catch (err) {
        console.error("Warning: Could not delete old template image:", err);
      }

      // Save the new image URL
      const serverUrl = process.env.SERVER_URL;
      template.imageUrl = `${serverUrl}/uploads/images/${req.file.filename}`;
    }

    await template.save();

    res.status(200).json({ 
      success: true, 
      data: template, 
      message: "Template updated successfully" 
    });
  } catch (error) {
    console.error("Update Template Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Template
exports.deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if template is in use
    const usageCount = await Certificate.countDocuments({ templateId: id });
    if (usageCount > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Cannot delete. This template is used in ${usageCount} certificates.` 
      });
    }

    const template = await CertificateTemplate.findById(id);
    if (!template) {
      return res.status(404).json({ success: false, message: "Template not found" });
    }

    // Delete file
    const filename = template.imageUrl.split('/').pop();
    const filePath = path.join(__dirname, "../uploads/images", filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await CertificateTemplate.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};