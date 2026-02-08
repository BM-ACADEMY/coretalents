const mongoose = require('mongoose');

const certificateContentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    help: "Internal name for admin selection (e.g., 'Standard Workshop', 'Special Merit')"
  },
  type: {
    type: String,
    enum: ['regular', 'special'],
    default: 'regular',
    required: true
  },
  bodyText: {
    type: String,
    required: true,
    help: "Use placeholders: {studentName}, {courseName}, {date}, {certNumber}"
  },
  // Optional: Secondary text for footer/subtitles if needed
  subText: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model('CertificateContent', certificateContentSchema);
