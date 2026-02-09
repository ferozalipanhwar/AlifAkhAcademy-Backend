import express from "express";
import {
  addLecture,
  bulkUploadQuestions,
  createCategory,
  createQuestion,
  createTest,
  deleteCategory,
  deleteLecture,
  deleteQuestion,
  deleteTest,
  getAllApplications,
  getLecturesByCourse,
  getLectureStats,
  updateApplicationStatus,
  updateCategory,
  updateLecture,
  updateQuestion,
  updateTest
} from "../controllers/adminController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply middleware to all routes
router.use(protect, admin);

// Category Routes
router.post("/category", createCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

// Test Routes
router.post("/test", createTest);
router.put("/test/:id", updateTest);
router.delete("/test/:id", deleteTest);

// Question Routes
router.post("/question", createQuestion);
router.put("/question/:id", updateQuestion);
router.delete("/question/:id", deleteQuestion);
router.post("/bulk-upload", bulkUploadQuestions); 




router.get('/applications', getAllApplications);
router.put('/applications/:id',updateApplicationStatus);





// Lecture Routes
router.get("/lectures/:courseId", getLecturesByCourse); // Get all lectures for a course
router.post("/lecture", addLecture);             // Create
router.put("/lecture/:id", updateLecture);       // Update
router.delete("/lecture/:id", deleteLecture);    // Delete
router.get("/lecture/stats", getLectureStats);   // Analytics
export default router;