import express from "express";
import {
  getAttemptTests,
  getCategories,
  getTestsByCategory,
  myResults,
  startTest,
  submitTest,
  verifyCertificate,
} from "../controllers/testController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/category/:categoryId", getTestsByCategory);
router.get("/start/:testId", protect, startTest);
router.post("/submit", protect, submitTest);
router.get("/my-results/", protect, myResults);
router.get("/attempt-tests", protect, admin, getAttemptTests);
router.get("/verify-certificate/:id", verifyCertificate);
export default router;
