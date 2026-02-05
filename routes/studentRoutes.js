import express from "express";
import {
  addStudent,
  deleteStudent,
  getMyCourses,
  getStudents,
  playCourse,
} from "../controllers/studentController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, admin, addStudent);
router.get("/", getStudents);
router.delete("/:id", protect, admin, deleteStudent);
router.get("/my-courses/:userId", getMyCourses);
router.get("/play-course/:courseId/:userId", protect, playCourse);

export default router;
