import Teacher from "../models/Teacher.js";

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
