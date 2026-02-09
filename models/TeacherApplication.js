import mongoose from "mongoose";

const TeacherApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Links to your existing User model
    required: true,
    unique: true // One application per user
  },
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: String, required: true },
  subject: { type: String, required: true },
  portfolio: { type: String },
  bio: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("TeacherApplication", TeacherApplicationSchema);
