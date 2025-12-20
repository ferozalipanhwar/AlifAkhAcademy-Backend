import express from "express";
import { enrollCourse, getAllEnrollments } from "../controllers/courseEnrollmentController.js";
import { protect } from "../middleware/authMiddleware.js";
import optionalAuth from "../middleware/optionalAuth.js";
const router = express.Router();

router.post("/enroll", optionalAuth, enrollCourse);
router.get("/all", protect, getAllEnrollments);
export default router;
