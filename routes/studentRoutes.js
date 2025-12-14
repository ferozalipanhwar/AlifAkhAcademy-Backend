import express from "express";
import {
  addStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../controllers/studentController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, admin, addStudent);
router.get("/", getStudents);
router.delete("/:id", protect, admin, deleteStudent);
router.put("/:id", protect, admin, updateStudent);
export default router;
