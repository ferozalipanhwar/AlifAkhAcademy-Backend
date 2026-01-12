import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  icon: String,
  isActive: { type: Boolean, default: true }
});

export default mongoose.model("TestCategory", schema);
