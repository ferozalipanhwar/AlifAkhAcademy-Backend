import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestCategory"
  },
  type: String,
  duration: Number,
  totalMarks: Number,
  passMarks: Number,
  isActive: Boolean
});

export default mongoose.model("Test", schema);
