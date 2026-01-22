import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    // Link the Student record to a User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Link the Student record to a Course
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);