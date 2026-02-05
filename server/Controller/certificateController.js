const Certificate = require("../model/Certificate");
const mongoose = require("mongoose");

// Helper function to generate Certificate Number
const generateCertificateNumber = async (issueDate) => {
  const dateObj = new Date(issueDate);
  const year = dateObj.getFullYear();

  const lastCert = await Certificate.findOne({
    certificateNumber: { $regex: `^CT${year}` }
  }).sort({ certificateNumber: -1 });

  let nextSequence = 1;

  if (lastCert) {
    const lastSequenceStr = lastCert.certificateNumber.slice(-3);
    const lastSequenceNum = parseInt(lastSequenceStr, 10);
    if (!isNaN(lastSequenceNum)) {
      nextSequence = lastSequenceNum + 1;
    }
  }

  return `CT${year}${String(nextSequence).padStart(3, '0')}`;
};

// Create Certificate
exports.createCertificate = async (req, res) => {
  try {
    let { studentName, courseName, issueDate, certificateNumber, templateUrl } = req.body;

    // 1. Validation
    if (!studentName || !courseName || !issueDate || !templateUrl) {
      return res.status(400).json({
        success: false,
        message: "Student Name, Course Name, Issue Date, and Template are required."
      });
    }

    // 2. Handle Certificate Number
    if (certificateNumber) {
      const existingCert = await Certificate.findOne({ certificateNumber });
      if (existingCert) {
        return res.status(400).json({
          success: false,
          message: `Certificate number ${certificateNumber} already exists.`
        });
      }
    } else {
      certificateNumber = await generateCertificateNumber(issueDate);
    }

    // 3. Create Record
    const certificate = await Certificate.create({
      studentName,
      courseName,
      issueDate,
      certificateNumber,
      templateUrl, // ✅ Saving the selected template
      createdBy: req.user ? req.user.id : null
    });

    res.status(201).json({ success: true, data: certificate });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Certificate number already exists." });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Certificates
exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Certificate
exports.getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    let certificate;

    if (mongoose.Types.ObjectId.isValid(id)) {
      certificate = await Certificate.findById(id);
    }

    if (!certificate) {
      certificate = await Certificate.findOne({
        certificateNumber: { $regex: `^${id}$`, $options: "i" }
      });
    }

    if (!certificate) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }

    res.status(200).json({ success: true, data: certificate });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Certificate
exports.updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!certificate) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }

    res.status(200).json({ success: true, data: certificate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Certificate
exports.deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);

    if (!certificate) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }

    res.status(200).json({ success: true, message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
