import Question from "../models/Question.js";
import Test from "../models/Test.js";
import TestCategory from "../models/TestCategory.js";

/* ================= CATEGORY MANAGEMENT ================= */

// @desc    Create a Category
// @route   POST /api/admin/category
export const createCategory = async (req, res) => {
  try {
    const category = await TestCategory.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Failed to create category" });
  }
};

// @desc    Update a Category
// @route   PUT /api/admin/category/:id
export const updateCategory = async (req, res) => {
  try {
    const category = await TestCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return updated doc
    );
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// @desc    Delete a Category
// @route   DELETE /api/admin/category/:id
export const deleteCategory = async (req, res) => {
  try {
    await TestCategory.findByIdAndDelete(req.params.id);
    // Optional: Delete all tests inside this category (Cascading delete)
    await Test.deleteMany({ categoryId: req.params.id });
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

/* ================= TEST MANAGEMENT ================= */

// @desc    Create a Test
// @route   POST /api/admin/test
export const createTest = async (req, res) => {
  try {
    const test = await Test.create(req.body);
    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ message: "Failed to create test" });
  }
};

// @desc    Update a Test
// @route   PUT /api/admin/test/:id
export const updateTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// @desc    Delete a Test
// @route   DELETE /api/admin/test/:id
export const deleteTest = async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    // Delete all questions in this test
    await Question.deleteMany({ testId: req.params.id });
    res.status(200).json({ message: "Test deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

/* ================= QUESTION MANAGEMENT ================= */

// @desc    Add Question to Test
// @route   POST /api/admin/question
export const createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: "Failed to add question" });
  }
};

// @desc    Update Question
// @route   PUT /api/admin/question/:id
export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// @desc    Delete Question
// @route   DELETE /api/admin/question/:id
export const deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};


export const bulkUploadQuestions = async (req, res) => {
  try {
    const { testId, questions } = req.body;

    if (!testId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Test ID and Questions Array are required." });
    }

    // Map through questions to add the testId to each object
    const formattedQuestions = questions.map((q) => ({
      testId: testId,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer, // Ensure JSON uses this exact key
      marks: q.marks || 1 // Default marks if missing
    }));

    // Insert all at once
    await Question.insertMany(formattedQuestions);

    res.status(201).json({ 
      message: "Bulk upload successful", 
      count: formattedQuestions.length 
    });

  } catch (error) {
    console.error("Bulk Upload Error:", error);
    res.status(500).json({ message: "Failed to upload questions", error: error.message });
  }
};

import Lecture from "../models/Lecture.js";

// --- LECTURE MANAGEMENT ---

// 1. Add Lecture
export const addLecture = async (req, res) => {
  try {
    const lecture = await Lecture.create(req.body);
    res.status(201).json({ message: "Lecture added successfully", lecture });
  } catch (err) {
    res.status(500).json({ message: "Failed to add lecture", error: err.message });
  }
};

// 2. Update Lecture
export const updateLecture = async (req, res) => {
  try {
    const updatedLecture = await Lecture.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedLecture);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// 3. Delete Lecture
export const deleteLecture = async (req, res) => {
  try {
    await Lecture.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Lecture has been deleted." });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

// 4. Lecture Analytics (Basic)
export const getLectureStats = async (req, res) => {
  try {
    const stats = await Lecture.aggregate([
      {
        $group: {
          _id: "$courseId",
          totalLectures: { $sum: 1 },
          avgDuration: { $avg: { $toDouble: "$duration" } } // Agar duration number mein ho
        }
      }
    ]);
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getLecturesByCourse  = async (req, res) => {
  try {
    const { courseId } = req.params; // <--- Ye ID URL se aani chahiye

    // ⚠️ GHALTI YAHAN HOTI HAI: Agar courseId nahi mili to ye sab fetch karega
    if (!courseId) {
        return res.status(400).json({ message: "Course ID is required" });
    }

    // Sirf us specific course ke lectures dhundein
    const lectures = await Lecture.find({ courseId: courseId }).sort({ order: 1 });

    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};