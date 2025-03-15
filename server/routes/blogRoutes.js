const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

// ✅ جلب كل البوستات
router.post("/", async (req, res) => {
  try {
    const { title, content, author, imageUrl } = req.body; // لازم تجيب الـ imageUrl
    const newBlog = new Blog({ title, content, author, imageUrl }); // لازم تمرره هنا
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: "Error creating blog", error });
  }
});

// ✅ إضافة بوست جديد
router.post("/", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: "Error creating blog", error });
  }
});

module.exports = router;
