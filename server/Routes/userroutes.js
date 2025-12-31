const express = require("express");
const router = express.Router();
const userController = require("../Controller/usercontroller");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

// Protect all routes with token verification
router.use(verifyToken);

// Admin Only Routes
router.get("/", authorizeRoles("admin"), userController.getAllUsers); 
router.delete("/:id", authorizeRoles("admin"), userController.deleteUser);

// User or Admin can access these
router.get("/:id", userController.getUserById);      
router.put("/:id", userController.updateUser);       

module.exports = router;