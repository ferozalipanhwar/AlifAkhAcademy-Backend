import Course from "../models/Course.js";
import Student from "../models/student.js";

export const addStudent = async (req, res) => {
  try {
    const { fullname, email, courseId } = req.body;

    if (!fullname || !email || !courseId) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: "Invalid course ID" });

    const student = await Student.create({ fullname, email, courseId });

    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("courseId", "title");
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ msg: "Student deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
export const updateStudent = async (req, res) => {
  try {
    const { fullname, email, courseId } = req.body;

    if (!fullname || !email || !courseId) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: "Invalid course ID" });

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { fullname, email, courseId },
      { new: true }
    );

    res.json(student);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};