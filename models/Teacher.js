import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);
