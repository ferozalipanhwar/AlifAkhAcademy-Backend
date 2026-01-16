import express from "express";
import {
  addMcq,
  bulkUploadMcqs, // Existing
  createSubject, createTopic, deleteMcq,



  deleteSubject,
  deleteTopic, getMcqs, getSubjects, getTopics, updateMcq
} from "../controllers/prepController.js";
import { admin, protect } from "../middleware/authMiddleware.js"; // Your existing middleware

const router = express.Router();



// ... existing routes ...

// Bulk Upload Route
router.post("/mcq/bulk", protect, admin, bulkUploadMcqs);
// Subjects
router.post("/subject", protect, admin, createSubject);
router.delete("/subject/:id", protect, admin, deleteSubject);

// Topics
router.post("/topic", protect, admin, createTopic);
router.delete("/topic/:id", protect, admin, deleteTopic);

// MCQs
router.post("/mcq", protect, admin, addMcq);
router.put("/mcq/:id", protect, admin, updateMcq);
router.delete("/mcq/:id", protect, admin, deleteMcq);

router.get("/subjects", getSubjects);
router.get("/topics/:subjectId", getTopics);
router.get("/mcqs", getMcqs); 


export default router;
