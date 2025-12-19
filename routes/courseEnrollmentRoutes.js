import express from "express";
import { enrollCourse } from "../controllers/courseEnrollmentController.js";
import optionalAuth from "../middleware/optionalAuth.js";

const router = express.Router();

router.post("/enroll", optionalAuth, enrollCourse);

export default router;
