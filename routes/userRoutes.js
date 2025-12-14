import express from "express";
import {
  addUser,
  deleteUser,
  getByid,
  getUsers,
  updateUser,
} from "../controllers/userController.js";

import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, admin, addUser);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);
router.get("/", protect, admin, getUsers);
router.get("/:id", protect, admin, getByid);

export default router;
