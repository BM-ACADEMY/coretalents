const Certificate = require("../model/Certificate");
const mongoose = require("mongoose");

// Helper: Generate Number (Unchanged)
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
    if (!isNaN(lastSequenceNum)) nextSequence = lastSequenceNum + 1;
  }
  return `CT${year}${String(nextSequence).padStart(3, '0')}`;
};

exports.getNextCertificateNumber = async (req, res) => {
  try {
    const nextId = await generateCertificateNumber(new Date());
    res.status(200).json({ success: true, nextId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ UPDATED CREATE
exports.createCertificate = async (req, res) => {
  try {
    let { studentName, courseName, issueDate, certificateNumber, templateId, contentId } = req.body;

    if (!studentName || !courseName || !issueDate || !templateId || !contentId) {
      return res.status(400).json({
        success: false,
        message: "Student Name, Course, Date, Template, and Content Type are required."
      });
    }

    if (certificateNumber) {
      const existingCert = await Certificate.findOne({ certificateNumber });
      if (existingCert) return res.status(400).json({ success: false, message: "Certificate number exists." });
    } else {
      certificateNumber = await generateCertificateNumber(issueDate);
    }

    const certificate = await Certificate.create({
      studentName,
      courseName,
      issueDate,
      certificateNumber,
      templateId,
      contentId, // ✅ Save Content ID
      createdBy: req.user ? req.user.id : null
    });

    res.status(201).json({ success: true, data: certificate });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ success: false, message: "Duplicate certificate number." });
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ UPDATED GET ALL (Populate contentId)
exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .populate('templateId', 'name imageUrl')
      .populate('contentId') // ✅ Populate
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ UPDATED GET SINGLE (Populate contentId)
exports.getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;
    let query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { certificateNumber: { $regex: `^${id}$`, $options: "i" } };

    const certificate = await Certificate.findOne(query)
      .populate('templateId', 'name imageUrl')
      .populate('contentId'); // ✅ Populate

    if (!certificate) return res.status(404).json({ success: false, message: "Certificate not found" });
    res.status(200).json({ success: true, data: certificate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ UPDATED UPDATE
exports.updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    ).populate('templateId').populate('contentId');
    if (!certificate) return res.status(404).json({ success: false, message: "Certificate not found" });
    res.status(200).json({ success: true, data: certificate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) return res.status(404).json({ success: false, message: "Certificate not found" });
    res.status(200).json({ success: true, message: "Certificate deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
