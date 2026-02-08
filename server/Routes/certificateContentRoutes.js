const express = require("express");
const router = express.Router();
const controller = require("../Controller/certificateContentController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

// Only Admin should manage content templates
router.post("/", verifyToken, authorizeRoles("admin"), controller.createContent);
router.get("/", verifyToken, controller.getAllContent); // Users might need to see list if you allow user-creation later, otherwise restrict
router.put("/:id", verifyToken, authorizeRoles("admin"), controller.updateContent);
router.delete("/:id", verifyToken, authorizeRoles("admin"), controller.deleteContent);

module.exports = router;
