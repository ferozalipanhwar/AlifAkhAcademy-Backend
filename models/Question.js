import mongoose from "mongoose";

const schema = new mongoose.Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test"
  },
  question: String,
  options: [String],
  correctAnswer: String,
  marks: Number
});

export default mongoose.model("Question", schema);
