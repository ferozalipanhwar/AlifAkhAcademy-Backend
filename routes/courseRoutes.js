import express from "express";
import { addCourse, deleteCourse, getCourseById, getCourses, updateCourse } from "../controllers/courseController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();
router.post("/addCourse", protect,admin,upload.single("img") ,addCourse);
router.get("/", getCourses);
router.get("/getCourseById/:id", protect, getCourseById);
router.put("/updateCourse/:id", protect,admin,upload.single("img"), updateCourse);
router.delete("/deleteCourse/:id", protect,admin, deleteCourse);
export default router;