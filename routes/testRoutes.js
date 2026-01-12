import express from "express";
import {
  getCategories,
  getTestsByCategory,
  myResults,
  startTest,
  submitTest
} from "../controllers/testController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/category/:categoryId", getTestsByCategory);
router.get("/start/:testId", startTest);
router.post("/submit",protect, submitTest);
router.get("/my-results/",protect, myResults);


export default router;
