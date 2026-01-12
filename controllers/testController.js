import mongoose from "mongoose";
import Question from "../models/Question.js";
import Test from "../models/Test.js";
import TestAttempt from "../models/TestAttempt.js";
import TestCategory from "../models/TestCategory.js";
import TestResult from "../models/TestResult.js";

/* ===================== CATEGORIES ===================== */
export const getCategories = async (req, res) => {
  try {
    const categories = await TestCategory.find({ isActive: true });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to load categories" });
  }
};

/* ===================== TESTS BY CATEGORY ===================== */
export const getTestsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category id" });
    }

    const tests = await Test.find({
      categoryId,
      isActive: true
    });

    res.status(200).json(tests);
  } catch (err) {
    console.error("getTestsByCategory ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ===================== START TEST ===================== */
export const startTest = async (req, res) => {
  try {
    const { testId } = req.params;

    const questions = await Question.find({ testId });

    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: "Failed to start test" });
  }
};

/* ===================== SUBMIT TEST ===================== */
export const submitTest = async (req, res) => {
  try {
    const { testId, answers } = req.body;
    const userId = req.user.id;

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    const questions = await Question.find({ testId });

    let score = 0;

    questions.forEach(q => {
      const userAns = answers.find(
        a => a.questionId.toString() === q._id.toString()
      );

      if (userAns && userAns.selectedAnswer === q.correctAnswer) {
        score += q.marks;
      }
    });

    const percentage = (score / test.totalMarks) * 100;
    const status = score >= test.passMarks ? "Pass" : "Fail";

    let grade = "F";
    if (percentage >= 85) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 55) grade = "C";
    else if (percentage >= 40) grade = "D";

    /* ===== SAVE ATTEMPT ===== */
    const attempt = await TestAttempt.create({
      userId,
      testId,
      score,
      totalMarks: test.totalMarks,
      status,
      answers
    });

    /* ===== SAVE RESULT ===== */
    const result = await TestResult.create({
      userId,
      testId,
      attemptId: attempt._id,
      score,
      totalMarks: test.totalMarks,
      percentage: Number(percentage.toFixed(2)),
      status,
      grade
    });

    res.status(200).json({
      message: "Test submitted successfully",
      score,
      percentage,
      status,
      grade,
      resultId: result._id
    });

  } catch (err) {
    console.error("submitTest ERROR:", err);
    res.status(500).json({ message: "Failed to submit test" });
  }
};

/* ===================== MY RESULTS ===================== */
export const myResults = async (req, res) => {
  try {
    const results = await TestResult.find({ userId: req.user.id })
      .populate("testId", "title").populate("userId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: "Failed to load results" });
  }
};
