import Blog from "../models/Blogs.js";
export const createBlog = async (req, res) => {
  try {
    const { title, author, category, content } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newBlog = await Blog.create({
      title,
      author,
      category,
      content,
      img: req.file.path,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL BLOGS (Public)
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE BLOG
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE BLOG (Admin Only)
export const updateBlog = async (req, res) => {
  try {
    const { title, author, category, content } = req.body;

    const updatedData = { title, author, category, content };

    if (req.file) {
      updatedData.img = req.file.path;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res.json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE BLOG (Admin Only)
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
