const BlogPost = require('../model/Blog'); // Adjust path to your Model
const fs = require('fs');
const path = require('path');

// --- 1. CREATE BLOG ---
// --- 1. CREATE BLOG (Updated) ---
exports.createBlog = async (req, res) => {
  try {
    const { title, slug, description, contentBlocks, tags, category } = req.body;

    if (!req.file) return res.status(400).json({ message: "Cover image is required" });

    // Construct the full server URL
    // Ensure SERVER_URL is defined in your .env (e.g., SERVER_URL=http://localhost:4000)
    const serverUrl = process.env.SERVER_URL || `${req.protocol}://${req.get('host')}`;
    const coverImageUrl = `${serverUrl}/uploads/blog/${slug}/${req.file.filename}`;

    const newBlog = new BlogPost({
      title,
      slug,
      description,
      category,
      coverImage: {
        url: coverImageUrl, // Saves the full path: http://localhost:4000/uploads/...
        altText: title
      },
      contentBlocks: typeof contentBlocks === 'string' ? JSON.parse(contentBlocks) : contentBlocks,
      author: req.user.id, 
      tags: tags ? (tags.startsWith('[') ? JSON.parse(tags) : tags.split(',')) : [],
      status: 'published'
    });

    await newBlog.save();
    res.status(201).json({ success: true, message: "Blog created!", data: newBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 2. UPLOAD IMAGE (Inside content) ---
exports.uploadContentImage = (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });
    const folderSlug = req.body.slug || 'general';
    // Adjust SERVER_URL based on your .env
    const imageUrl = `${process.env.SERVER_URL}/uploads/blog/${folderSlug}/${req.file.filename}`;
    res.status(200).json({ success: true, url: imageUrl });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// --- 3. GET ALL BLOGS (Prevents "handler is not a function" error) ---
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

// --- 4. GET SINGLE BLOG ---
exports.getSingleBlog = async (req, res) => {
    try {
      const blog = await BlogPost.findOne({ slug: req.params.slug }).populate('author', 'name');
      if(!blog) return res.status(404).json({ message: "Not found" });
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blog" });
    }
};