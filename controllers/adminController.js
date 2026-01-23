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