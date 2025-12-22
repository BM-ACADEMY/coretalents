const mongoose = require('mongoose');

// 1. Define the Schema for dynamic blocks (The "Inside Section")
const ContentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['heading', 'subheading', 'paragraph', 'image', 'list', 'quote', 'button', 'dropdown'],
    required: true
  },
  // We use a flexible 'data' object to store different fields based on the 'type'
  data: {
    // For Headings & Paragraphs
    text: { type: String },
    level: { type: Number, default: 2 }, // e.g., 1 for H1, 2 for H2 (for headings only)
    
    // For Images
    url: { type: String },
    caption: { type: String },
    altText: { type: String }, // Crucial for SEO
    width: { type: String, default: "100%" },

    // For Lists
    items: [{ type: String }], // Array of list items
    style: { type: String, enum: ['ordered', 'unordered'], default: 'unordered' },

    // For Quotes
    quoteText: { type: String },
    quoteAuthor: { type: String },

    // For Buttons
    buttonText: { type: String },
    buttonLink: { type: String },
    buttonStyle: { type: String, enum: ['primary', 'outline', 'text'], default: 'primary' },

    // For Dropdowns (Accordion)
    dropdownTitle: { type: String },
    dropdownContent: { type: String }
  },
  order: { type: Number } // To keep track of the sequence
}, { _id: false });

// 2. Define the Main Blog Schema
const BlogPostSchema = new mongoose.Schema({
  // --- SEO & URL Info ---
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true 
  },
  metaTitle: { type: String },
  metaDescription: { type: String },

  // --- Main Header Info ---
  title: { type: String, required: true },
  description: { type: String }, // Short summary for card view
  coverImage: {
    url: { type: String, required: true },
    altText: { type: String, default: "Blog Cover" }
  },
  
  // --- Author & Status ---
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Assuming you have a User model
    required: true 
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedDate: { type: Date },
  
  // --- Categorization ---
  tags: [{ type: String }],
  category: { type: String },

  // --- THE DYNAMIC CONTENT ---
  // This array allows you to add multiple sections in any order
  contentBlocks: [ContentBlockSchema]

}, { timestamps: true });

module.exports = mongoose.model('BlogPost', BlogPostSchema);