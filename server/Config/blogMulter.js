const multer = require('multer');
const path = require('path');
const fs = require('fs');
const slugify = require('slugify'); // Ensure you have: npm install slugify

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let blogSlug = 'uncategorized'; // Default fallback to prevent crash

    // Try to get slug from body
    if (req.body && req.body.slug) {
      blogSlug = req.body.slug;
    } 

    // Define path: uploads/blog/blog-slug/
    const uploadPath = path.join(__dirname, '../uploads/blog', blogSlug);

    // Create directory recursively if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Sanitize filename
    const cleanName = file.originalname.replace(/\s+/g, '-').toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + cleanName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;