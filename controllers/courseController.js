import deleteCloudinaryImage from "../middleware/deleteCloudinaryImage.js";
import Course from "../models/Course.js";

/* ================= ADD COURSE ================= */
export const addCourse = async (req, res) => {
  try {
    const { title, duration, description, teacherId, fee } = req.body;

    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID required" });
    }

    const course = await Course.create({
      title,
      duration,
      description,
      fee: fee ? fee : 0,
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

/* ================= GET ALL COURSES ================= */
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacherId", "fullname");
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET SINGLE COURSE ================= */
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("teacherId");

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= UPDATE COURSE ================= */
export const updateCourse = async (req, res) => {
  try {
    const { title, duration, description, teacherId, fee } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 🔥 NEW IMAGE → DELETE OLD IMAGE
    if (req.file && course.img) {
      await deleteCloudinaryImage(course.img);
      course.img = req.file.path;
    }

    course.title = title;
    course.duration = duration;
    course.description = description;
    course.teacherId = teacherId;
    course.fee = fee ? fee : course.fee;

    await course.save();
    await course.populate("teacherId", "fullname");

    res.json({ success: true, data: course });
  } catch (error) {
    console.error("Update Course Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE COURSE ================= */
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // 🔥 DELETE IMAGE FROM CLOUDINARY
    if (course.img) {
      await deleteCloudinaryImage(course.img);
    }

    await course.deleteOne();

    res.json({
      success: true,
      message: "Course & image deleted successfully",
    });
  } catch (error) {
    console.error("Delete Course Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
