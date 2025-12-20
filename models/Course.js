import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    fee: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    img: {
      type: String,
    },

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  { timestamps: true }
);

// avoid overwrite error
const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
