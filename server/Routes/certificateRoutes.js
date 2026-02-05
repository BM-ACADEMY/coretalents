const express = require("express");
const router = express.Router();
const certificateController = require("../Controller/certificateController");
const templateController = require("../Controller/certificateTemplateController");
const upload = require("../Config/multer"); // ✅ USING YOUR CONFIG
const { verifyToken, authorizeRoles } = require("../middleware/auth");

// ==========================================
// 1. TEMPLATE ROUTES (Must be defined FIRST)
// ==========================================

// Upload a new template background (Admin Only)
router.post(
  "/templates",
  verifyToken,
  authorizeRoles("admin"),
  upload.single("image"), // Field name in frontend must be "image"
  templateController.uploadTemplate
);

// Get all available templates
router.get(
  "/templates",
  verifyToken,
  templateController.getAllTemplates
);

// Delete a template (Admin Only)
router.delete(
  "/templates/:id",
  verifyToken,
  authorizeRoles("admin"),
  templateController.deleteTemplate
);

// ==========================================
// 2. CERTIFICATE ROUTES
// ==========================================

// Public Route: Verify Certificate by ID or Number
// (Must come after /templates so "templates" isn't treated as an ID)
router.get("/:id", certificateController.getCertificateById);

// Get All Certificates (Admin/Staff)
router.get("/", verifyToken, certificateController.getAllCertificates);

// Create Certificate (Admin Only)
router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  certificateController.createCertificate
);

// Update Certificate (Admin Only)
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  certificateController.updateCertificate
);

// Delete Certificate (Admin Only)
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  certificateController.deleteCertificate
);

module.exports = router;
