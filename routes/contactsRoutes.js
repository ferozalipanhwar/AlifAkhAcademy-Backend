import express from "express";
import {
  deleteMessage,
  getAllMessages,
  sendMessage,
} from "../controllers/contactsController.js";

const router = express.Router();

// User route
router.post("/send", sendMessage);

// Admin routes
router.get("/all", getAllMessages);
router.delete("/:id", deleteMessage);

export default router;
