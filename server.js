import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import { default as authRoutes } from "./routes/authRoutes.js";
import Blog from "./routes/blogRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import contactRoutes from "./routes/contactsRoutes.js";
import courseUnrollmentRoutes from "./routes/courseEnrollmentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import prepRoutes from "./routes/prepRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
connectDB(); // connect MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/user",userRoutes);
app.use("/api/teachers",teacherRoutes);
app.use("/api/courses",courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blog", Blog);
app.use("/api/course-enrollment", courseUnrollmentRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/admin-tests", adminRoutes);
app.use("/api/prep", prepRoutes);
app.use("/api/chat", chatRoutes);



app.use("/api/test", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
