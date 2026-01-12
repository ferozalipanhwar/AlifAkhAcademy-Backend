import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test"
  },
  score: Number,
  totalMarks: Number,
  status: String,
  answers: Array,
  attemptedAt: { type: Date, default: Date.now }
});

export default mongoose.model("TestAttempt", schema);
