const express = require("express");
const router = express.Router();
const courseController = require("../Controller/courseController");

router.post("/", courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
