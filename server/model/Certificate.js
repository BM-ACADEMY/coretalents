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
    uppercase: true, // Ensures CT2026001 is always uppercase
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional: to track which admin created it
  }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
