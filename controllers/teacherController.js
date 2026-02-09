import Teacher from "../models/Teacher.js";
import TeacherApplication from "../models/TeacherApplication.js";

// ADD Teacher
export const addTeacher = async (req, res) => {
  try {
    const { fullname, courseId } = req.body;
   

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newTeacher = await Teacher.create({
      fullname,
      img: req.file.path,
      courseId,
    });

    res.status(201).json(newTeacher);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET All Teachers
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("courseId","title");
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE Teacher
export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    await Teacher.findByIdAndDelete(id);

    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
// UPDATE Teacher
export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, courseId } = req.body;

    // Prepare update data object
    const updateData = {
      fullname,
      courseId,
    };

    // If new image is uploaded, update image
    if (req.file) {
      updateData.img = req.file.path;
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, updateData, {
      new: true, // return updated document
      runValidators: true,
    });

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// @desc    Submit Teacher Application
// @route   POST /api/teachers/apply
// @access  Private (Student only)
export const applyForTeacher = async (req, res) => {
  try {
    const { fullname, email, qualification, experience, subject, portfolio, bio } = req.body;

    // 1. Check if user has already applied
    const existingApplication = await TeacherApplication.findOne({ userId: req.user.id });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already submitted an application." });
    }

    // 2. Create Application
    const application = new TeacherApplication({
      userId: req.user.id,
      fullname,
      email,
      qualification,
      experience,
      subject,
      portfolio,
      bio
    });

    await application.save();

    res.status(201).json({ message: "Application submitted successfully! Please wait for admin approval." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};