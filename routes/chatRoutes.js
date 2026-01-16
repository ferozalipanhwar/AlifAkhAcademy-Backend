import express from "express";
import { chatWithAI } from "../controllers/chatController.js";
const router = express.Router();


// This matches POST /api/chat
router.post("/", chatWithAI);

export default router;