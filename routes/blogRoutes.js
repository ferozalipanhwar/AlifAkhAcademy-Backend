import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  updateBlog,
} from "../controllers/blogController.js";

import { admin, protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// Admin
router.post("/create", protect, admin, upload.single("img"), createBlog);
router.put("/:id", protect, admin, upload.single("img"), updateBlog);
router.delete("/:id", protect, admin, deleteBlog);

export default router;
