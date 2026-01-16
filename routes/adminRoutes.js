import express from "express";
import {
  createCategory,
  createQuestion,
  createTest,
  deleteCategory,
  deleteQuestion,
  deleteTest,
  updateCategory,
  updateQuestion,
  updateTest,
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

export default router;