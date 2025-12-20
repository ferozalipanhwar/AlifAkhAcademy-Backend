import CourseEnrollment from "../models/CourseEnrollment.js";

export const enrollCourse = async (req, res) => {
  try {
    const {
      courseId,
      fullname,
      email,
      phoneNumber,
      message,
    } = req.body;

    const enrollment = new CourseEnrollment({
      courseId,
      fullname,
      email,
      phoneNumber,
      message,
      userId: req.user ? req.user._id : null, // ✅ login OR guest
    });

    await enrollment.save();

    res.status(201).json({
      success: true,
      message: "Enrollment successful",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Enrollment failed",
      error: error.message,
    });
  }
};

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await CourseEnrollment.find().populate("courseId", "title");

    res.status(200).json({
      success: true,
      enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch enrollments",
      error: error.message,
    });
  }
};