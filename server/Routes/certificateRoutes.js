const express = require("express");
const router = express.Router();
const certificateController = require("../Controller/certificateController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

// Public Route (Optional: If you want students to verify certificates, remove auth from get)
router.get("/:id", certificateController.getCertificateById);
router.get("/", verifyToken, certificateController.getAllCertificates);

// Admin Only Routes
router.post("/", verifyToken, authorizeRoles("admin"), certificateController.createCertificate);
router.put("/:id", verifyToken, authorizeRoles("admin"), certificateController.updateCertificate);
router.delete("/:id", verifyToken, authorizeRoles("admin"), certificateController.deleteCertificate);

module.exports = router;
