import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true
  },

  attemptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestAttempt",
    required: true
  },

  score: {
    type: Number,
    required: true
  },

  totalMarks: {
    type: Number,
    required: true
  },

  percentage: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["Pass", "Fail"],
    required: true
  },

  grade: {
    type: String // A, B, C etc
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("TestResult", testResultSchema);
