const BlogPost = require('../model/Blog'); // Adjust path to your Model
const fs = require('fs');
const path = require('path');

// --- 1. CREATE BLOG ---
// --- 1. CREATE BLOG (Updated) ---
// --- 1. CREATE BLOG (Updated for Category Robustness) ---
exports.createBlog = async (req, res) => {
  try {
    let { title, slug, description, contentBlocks, tags, category } = req.body;

    if (!req.file) return res.status(400).json({ message: "Cover image is required" });

    // Handle Category if it comes as a stringified object or a plain object
    let finalCategory = "Uncategorized";
    if (category) {
      try {
        // If it's a stringified JSON object, parse it
        const parsedCategory = typeof category === 'string' && category.startsWith('{') 
          ? JSON.parse(category) 
          : category;
        
        // Extract the name if it's an object, otherwise use the string
        finalCategory = typeof parsedCategory === 'object' ? parsedCategory.name : parsedCategory;
      } catch (e) {
        finalCategory = category; // Fallback to raw string
      }
    }

    const serverUrl = process.env.SERVER_URL || `${req.protocol}://${req.get('host')}`;
    const coverImageUrl = `${serverUrl}/uploads/blog/${slug}/${req.file.filename}`;

    const newBlog = new BlogPost({
      title,
      slug,
      description,
      category: finalCategory, // Now guaranteed to be a string
      coverImage: {
        url: coverImageUrl,
        altText: title
      },
      contentBlocks: typeof contentBlocks === 'string' ? JSON.parse(contentBlocks) : contentBlocks,
      author: req.user.id, 
      tags: tags ? (tags.startsWith('[') ? JSON.parse(tags) : tags.split(',')) : [],
      status: 'published'
    });

    await newBlog.save();
    res.status(201).json({ success: true, message: "Blog published successfully!", data: newBlog });
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