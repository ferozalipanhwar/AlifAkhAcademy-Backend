import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    duration: { type: String, required: true },
    fee: { type: Number, required: true },
    img: { type: String },

    // ADD THIS
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: false,
    },
  },
  { timestamps: true }
);

// avoid overwrite error
const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;
