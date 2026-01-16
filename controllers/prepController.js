import { PrepMcq, PrepSubject, PrepTopic } from "../models/PrepModels.js";

// @desc    Get All Subjects with Topic counts
export const getSubjects = async (req, res) => {
  try {
    const subjects = await PrepSubject.find({ isActive: true });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get Topics for a specific Subject
export const getTopics = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const topics = await PrepTopic.find({ subjectId });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get MCQs (Filtered by Subject, Topic, Page)
export const getMcqs = async (req, res) => {
  try {
    const { subjectId, topicId, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (subjectId) query.subjectId = subjectId;
    if (topicId) query.topicId = topicId;

    const mcqs = await PrepMcq.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 }); // Newest first

    const total = await PrepMcq.countDocuments(query);

    res.json({
      mcqs,
      page: Number(page),
      pages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Admin: Add MCQ
export const addMcq = async (req, res) => {
  try {
    const newMcq = await PrepMcq.create(req.body);
    // Optional: Increment topic count logic here
    res.status(201).json(newMcq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* ================= SUBJECT MANAGEMENT ================= */
export const createSubject = async (req, res) => {
  try {
    const subject = await PrepSubject.create(req.body);
    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    await PrepSubject.findByIdAndDelete(req.params.id);
    // Optional: Delete related topics/mcqs here if needed
    res.json({ message: "Subject deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= TOPIC MANAGEMENT ================= */
export const createTopic = async (req, res) => {
  try {
    const topic = await PrepTopic.create(req.body);
    res.status(201).json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    await PrepTopic.findByIdAndDelete(req.params.id);
    res.json({ message: "Topic deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= MCQ MANAGEMENT ================= */
export const updateMcq = async (req, res) => {
  try {
    const updatedMcq = await PrepMcq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMcq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMcq = async (req, res) => {
  try {
    await PrepMcq.findByIdAndDelete(req.params.id);
    res.json({ message: "MCQ deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};// ... existing imports ...

/* ================= BULK UPLOAD ================= */
export const bulkUploadMcqs = async (req, res) => {
  try {
    const { subjectId, topicId, mcqs } = req.body;

    if (!subjectId || !mcqs?.length) {
      return res.status(400).json({ message: "Invalid data. Subject and MCQs are required." });
    }

    // Format data to match Schema
    const formatted = mcqs.map(mcq => ({
      question: mcq.question,
      options: mcq.options, // Ensure your JSON has array of 4 strings
      correctOption: mcq.correctOption,
      explanation: mcq.explanation || "",
      subjectId,
      topicId: topicId || null, // Topic is optional but recommended
      difficulty: mcq.difficulty || "Medium",
      isVerified: true // Auto-verify bulk uploads by admin
    }));

    await PrepMcq.insertMany(formatted);
    
    // Optional: Update Topic Count
    if (topicId) {
       const count = await PrepMcq.countDocuments({ topicId });
       await PrepTopic.findByIdAndUpdate(topicId, { mcqCount: count });
    }

    res.json({ message: `${formatted.length} MCQs uploaded successfully!` });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};