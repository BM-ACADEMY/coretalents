const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  studentName: { type: String, required: true, trim: true },
  courseName: { type: String, required: true, trim: true },
  issueDate: { type: Date, required: true },
  certificateNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },

  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CertificateTemplate', // Background Image
    required: true
  },

  // ✅ NEW: Reference to the text content
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CertificateContent',
    required: true
  },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
