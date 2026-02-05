import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
  courseId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  title: { type: String, required: true },
  videoUrl: { type: String, required: true }, // Aapka YouTube link yahan aayega
  duration: { type: String }, // Optional: e.g., "05:20"
  order: { type: Number, default: 0 }, // Lectures ki sequence (1, 2, 3...)
  description: { type: String }
});

export default  mongoose.model('Lecture', LectureSchema);