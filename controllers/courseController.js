import Course from "../models/Course.js";

// Add Course
export const addCourse = async (req, res) => {
  try {
    const { title, duration, description, teacherId } = req.body;

    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID required" });
    }

    const course = await Course.create({
      title,
      duration,
      description,
      teacherId,
      img: req.file ? req.file.path : null,
    });

    await course.populate("teacherId", "fullname");

    res.json({ success: true, data: course });
  } catch (error) {
    console.error("Add Course Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacherId", "fullname");
    res.json({ success: true, data: courses });
  } catch (error) {
    console.error("Get Courses Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Single Course
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("teacherId");

    if (!course)
      return res.status(404).json({ success: false, message: "Course not found" });

    res.json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Course
export const updateCourse = async (req, res) => {
  try {
    const { title, duration, description, teacherId } = req.body;

    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID required" });
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title,
        duration,
        description,
        teacherId,
        img: req.file ? req.file.path : undefined,
      },
      { new: true }
    ).populate("teacherId", "fullname");

    res.json({ success: true, data: course });
  } catch (error) {
    console.error("Update Course Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course)
      return res.status(404).json({ success: false, message: "Course not found" });

    res.json({ success: true, message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
