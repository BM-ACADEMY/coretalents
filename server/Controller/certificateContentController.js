const CertificateContent = require("../model/CertificateContent");

// Create Content Template
exports.createContent = async (req, res) => {
  try {
    const content = await CertificateContent.create(req.body);
    res.status(201).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Content Templates
exports.getAllContent = async (req, res) => {
  try {
    const contents = await CertificateContent.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Content Template
exports.updateContent = async (req, res) => {
  try {
    const content = await CertificateContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Content Template
exports.deleteContent = async (req, res) => {
  try {
    await CertificateContent.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
