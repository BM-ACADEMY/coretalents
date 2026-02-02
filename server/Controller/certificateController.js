const Certificate = require("../model/Certificate");
const mongoose = require("mongoose");

// Helper function to generate Certificate Number
const generateCertificateNumber = async (issueDate) => {
  const dateObj = new Date(issueDate);
  const year = dateObj.getFullYear(); // e.g., 2026

  // Find the last certificate created for this specific year
  // Regex looks for strings starting with CT + Year
  const lastCert = await Certificate.findOne({
    certificateNumber: { $regex: `^CT${year}` }
  }).sort({ certificateNumber: -1 }); // Get the highest number

  let nextSequence = 1;

  if (lastCert) {
    // Extract the numeric part (last 3 digits) and increment
    const lastSequenceStr = lastCert.certificateNumber.slice(-3);
    const lastSequenceNum = parseInt(lastSequenceStr, 10);

    if (!isNaN(lastSequenceNum)) {
      nextSequence = lastSequenceNum + 1;
    }
  }

  // Format: CT + Year + 001 (padded with zeros)
  // Example: CT2026001
  return `CT${year}${String(nextSequence).padStart(3, '0')}`;
};

// Create Certificate
exports.createCertificate = async (req, res) => {
  try {
    let { studentName, courseName, issueDate, certificateNumber } = req.body;

    // 1. Validation
    if (!studentName || !courseName || !issueDate) {
      return res.status(400).json({
        success: false,
        message: "Student Name, Course Name, and Issue Date are required."
      });
    }

    // 2. Handle Certificate Number (Manual vs Auto)
    if (certificateNumber) {
      // Check if manually entered number already exists
      const existingCert = await Certificate.findOne({ certificateNumber });
      if (existingCert) {
        return res.status(400).json({
          success: false,
          message: `Certificate number ${certificateNumber} already exists.`
        });
      }
    } else {
      // Auto-generate if not provided
      certificateNumber = await generateCertificateNumber(issueDate);
    }

    // 3. Create Record
    const certificate = await Certificate.create({
      studentName,
      courseName,
      issueDate,
      certificateNumber,
      createdBy: req.user ? req.user.id : null // Assuming auth middleware adds user to req
    });

    res.status(201).json({ success: true, data: certificate });

  } catch (error) {
    // Handle duplicate key error (E11000) specifically
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

exports.getCertificateById = async (req, res) => {
  try {
    const { id } = req.params; // This could be _id OR certificateNumber
    let certificate;

    // 1. Check if the input is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      certificate = await Certificate.findById(id);
    }

    // 2. If not found by ID (or if not a valid ID), try finding by Certificate Number
    if (!certificate) {
      // Using regex for case-insensitive match (ct2025005 == CT2025005)
      certificate = await Certificate.findOne({
        certificateNumber: { $regex: `^${id}$`, $options: "i" }
      });
    }

    // 3. If still not found, return error
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
