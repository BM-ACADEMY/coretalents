const express = require("express");
const router = express.Router();
const userController = require("../Controller/usercontroller");
const { verifyToken } = require("../middleware/auth");

// Protect all user routes
router.use(verifyToken);

// CRUD
router.get("/", userController.getAllUsers);          // Get all users
router.get("/:id", userController.getUserById);      // Get single user
router.put("/:id", userController.updateUser);       // Update user
router.delete("/:id", userController.deleteUser);    // Delete user

module.exports = router;