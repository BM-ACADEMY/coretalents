const Content = require("../model/Reviewmodel");

// CREATE Content
exports.createContent = async (req, res) => {
  try {
    const { content, name, work } = req.body;

    const newContent = await Content.create({ content, name, work });

    res.status(201).json({
      success: true,
      message: "Content created successfully",
      data: newContent,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET All Content
exports.getAllContent = async (req, res) => {
  try {
    const contents = await Content.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: contents,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET Single Content
exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Content
exports.updateContent = async (req, res) => {
  try {
    const updated = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Content updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE Content
exports.deleteContent = async (req, res) => {
  try {
    const deleted = await Content.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
