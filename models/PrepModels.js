import mongoose from "mongoose";

// 1. Subject Schema (e.g., "Pakistan Studies", "Computer Science")
const subjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // e.g., 'pak-study'
  icon: String, 
  isActive: { type: Boolean, default: true }
});

// 2. Topic Schema (e.g., "Pre-Partition", "Rivers of Pakistan")
const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true }, // e.g., 'pre-partition'
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "PrepSubject", required: true },
  mcqCount: { type: Number, default: 0 } // Optimization: track count
});

// 3. MCQ Schema (The actual question)
const mcqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }], // Array of 4 strings
  correctOption: { type: String, required: true }, // The exact string of the correct answer
  explanation: { type: String }, // Optional: "Why is this correct?"
  
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "PrepSubject", required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "PrepTopic" }, // Optional (General MCQs might not have a specific topic)
  
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },
  isVerified: { type: Boolean, default: false }, // For admin approval
  createdAt: { type: Date, default: Date.now }
});

export const PrepSubject = mongoose.model("PrepSubject", subjectSchema);
export const PrepTopic = mongoose.model("PrepTopic", topicSchema);
export const PrepMcq = mongoose.model("PrepMcq", mcqSchema);