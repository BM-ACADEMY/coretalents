const mongoose = require("mongoose");

// Sub-schema for each content block
const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      "heading",
      "paragraph",
      "image",
      "list",
      "quote",
      "button",
      "accordion",
      "feature",
      "section",
    ],
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Flexible object to store block-specific data
    required: true,
  },
});

// Main Blog Schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now, // Defaults to today if not provided
    },
    mainHeading: { type: String, trim: true }, // <--- NEW FIELD
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: "Uncategorized",
    },
    coverImage: {
      url: {
        type: String,
        required: true,
      },
      altText: {
        type: String,
      },
    },
    contentBlocks: [contentBlockSchema], // Array of blocks with validated types

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    seo: {
      canonicalUrl: { type: String, trim: true },
      metaTitle: { type: String, trim: true },
      metaDescription: { type: String, trim: true },
      keywords: { type: [String], default: [] },
      openGraph: {
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        image: { type: String, trim: true },
      },
      schema: {
        articleType: { type: String, default: "Article" }, // TechArticle, NewsArticle, etc.
        faq: [
          {
            question: { type: String },
            answer: { type: String },
          },
        ],
      },
      ga4MeasurementId: { type: String, trim: true }, // Specific GA4 ID for this page if needed
      customScripts: { type: String }, // For injecting raw script tags
    },
    cta: {
      heading: { type: String, trim: true },
      description: { type: String, trim: true },
      buttonText: { type: String, trim: true },
      buttonUrl: { type: String, trim: true },
      enabled: { type: Boolean, default: true },
    },
    sidebar: {
      aboutTitle: { type: String, default: "About Core Talents" },
      aboutDescription: { type: String, trim: true },
      tags: { type: [String], default: [] }, // Sidebar specific tags
      consultationTitle: { type: String, default: "Need a Consultation?" },
      consultationText: { type: String, trim: true },
      consultationUrl: { type: String, trim: true },
      enabled: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  },
);

// Indexes for better performance
blogSchema.index({ slug: 1 });
blogSchema.index({ author: 1 });
blogSchema.index({ createdAt: -1 });

module.exports = mongoose.model("BlogPost", blogSchema);
