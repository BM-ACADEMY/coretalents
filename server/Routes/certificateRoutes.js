const express = require("express");
const router = express.Router();
const certificateController = require("../Controller/certificateController");
const templateController = require("../Controller/certificateTemplateController");
const upload = require("../Config/multer"); 
const { verifyToken, authorizeRoles } = require("../middleware/auth");

// ==========================================
// 1. TEMPLATE ROUTES 
// ==========================================

// Create Template
router.post(
  "/templates",
  verifyToken,
  authorizeRoles("admin"),
  upload.single("image"), 
  templateController.uploadTemplate
);

// Get All Templates
router.get(
  "/templates",
  verifyToken,
  templateController.getAllTemplates
);

// ✅ NEW: Update Template Route
router.put(
  "/templates/:id",
  verifyToken,
  authorizeRoles("admin"),
  upload.single("image"), // Allows updating the image
  templateController.updateTemplate
);

// Delete Template
router.delete(
  "/templates/:id",
  verifyToken,
  authorizeRoles("admin"),
  templateController.deleteTemplate
);

// ==========================================
// 2. CERTIFICATE ROUTES
// ==========================================

router.get("/next-id", verifyToken, certificateController.getNextCertificateNumber);

router.get("/:id", certificateController.getCertificateById);

router.get("/", verifyToken, certificateController.getAllCertificates);

router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  certificateController.createCertificate
);

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  certificateController.updateCertificate
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  certificateController.deleteCertificate
);

module.exports = router;