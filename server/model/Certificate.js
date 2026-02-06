const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  courseName: {
    type: String,
    required: true,
    trim: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  certificateNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  // ✅ CHANGED: Store Reference ID instead of URL string
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CertificateTemplate',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);