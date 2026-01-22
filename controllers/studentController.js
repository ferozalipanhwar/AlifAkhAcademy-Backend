import Course from "../models/Course.js";
import Student from "../models/student.js";
import User from "../models/User.js";

// 1. ADD STUDENT (Enroll User in Course)
export const addStudent = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Validation
    if (!userId || !courseId) {
      return res.status(400).json({ message: "User aur Course select karna zaroori hai" });
    }

    // --- NEW CHECK: Kya user pehle se is course mein hai? ---
    const existingEnrollment = await Student.findOne({ userId, courseId });

    if (existingEnrollment) {
      return res.status(400).json({ message: "Yeh user pehle hi is course mein enrolled hai!" });
    }
    // -------------------------------------------------------

    const newStudent = new Student({ userId, courseId });
    const savedStudent = await newStudent.save();

    // User ko update karein (Optional: Agar user model mein studentId array hai toh push karein, warna replace karega)
    await User.findByIdAndUpdate(userId, { studentId: savedStudent._id });

    res.status(201).json(savedStudent);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// 2. GET STUDENTS (Populate User and Course data)
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("userId", "name email") // Fetch User Name & Email
      .populate("courseId", "title");   // Fetch Course Title
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 3. DELETE STUDENT
export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json("Student has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};
// 1. Get My Courses (Updated with Nested Populate)
export const getMyCourses = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find enrollment -> Populate Course -> Inside Course, Populate Teacher
    const enrollments = await Student.find({ userId })
      .populate({
        path: "courseId",
        select: "title img duration description teacherId",
        populate: {
          path: "teacherId",
          select: "fullname email img", 
          model: "Teacher" // Ensure this matches your Teacher model name
        }
      });

    // Filter out deleted courses (null)
    const validEnrollments = enrollments.filter(e => e.courseId !== null);

    res.status(200).json(validEnrollments);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
// 2. Play Course (Secure Endpoint)
export const playCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.params;

    // SECURITY CHECK: Does an enrollment exist for this user & course?
    const enrollment = await Student.findOne({ userId, courseId });

    if (!enrollment) {
      return res.status(403).json({ message: "Access Denied: You are not enrolled." });
    }

    // If enrolled, fetch the full course details (including video URL)
    const course = await Course.findById(courseId);
    res.status(200).json(course);

  } catch (err) {
    res.status(500).json(err);
  }
};