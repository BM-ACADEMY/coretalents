const express = require("express");
const router = express.Router();
const authController = require("../Controller/authcontroller");
const { verifyToken } = require("../middleware/auth");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/google", authController.googleLogin);

// Protected routes
router.get("/me", verifyToken, authController.getMe);
router.post("/logout", authController.logout);

module.exports = router;