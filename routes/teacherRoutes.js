import express from "express";
import {
  addTeacher,
  applyForTeacher,
  deleteTeacher,
  getTeachers,
  updateTeacher
} from "../controllers/teacherController.js";


import { admin, protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post("/add", protect, admin, upload.single("img"), addTeacher);
router.put("/:id", protect, admin, upload.single("img"), updateTeacher ); //upadte techer



router.get("/", getTeachers);
router.delete("/:id", protect, admin, deleteTeacher);






router.post('/apply', protect, applyForTeacher);



export default router;