const Resume = require("../model/ResumeModel");
const fs = require("fs");
const path = require("path");

// Create or Update Resume
exports.saveResume = async (req, res) => {
  console.log("------------------- RESUME SAVE ATTEMPT -------------------");
  console.log("1. User ID:", req.user ? req.user.id : "USER NOT FOUND");
  console.log("2. File received:", req.file ? req.file.filename : "No file uploaded");
  console.log("3. Body keys received:", Object.keys(req.body));

  try {
    // --- 1. SAFE PARSING HELPER ---
    // FormData sends objects as JSON strings. We must parse them safely.
    const parseData = (data) => {
      if (!data) return []; // Return empty array/obj if undefined
      try {
        return typeof data === "string" ? JSON.parse(data) : data;
      } catch (e) {
        console.error("JSON Parse Error for field:", data);
        return []; // Fallback to empty
      }
    };

    // Extract and Parse
    let personalInfo = req.body.personalInfo ? JSON.parse(req.body.personalInfo) : {};
    let experience = parseData(req.body.experience);
    let education = parseData(req.body.education);
    let projects = parseData(req.body.projects);
    let skills = parseData(req.body.skills);
    let summary = req.body.summary || "";
    let themeColor = req.body.themeColor || "#3b82f6";

    // --- 2. HANDLE IMAGE URL ---
    // If a file was uploaded, create the URL. 
    // If not, keep the existing image URL from personalInfo (if it exists).
    let imageUrl = personalInfo.image || ""; 
    
    if (req.file) {
      // NOTE: Ensure process.env.SERVER_URL is defined in .env (e.g., http://localhost:4000)
      const serverUrl = process.env.SERVER_URL || "http://localhost:4000";
      imageUrl = `${serverUrl}/uploads/resume/${req.file.filename}`;
    }

    // Update personalInfo object with the correct image URL
    personalInfo.image = imageUrl;

    // --- 3. DATABASE OPERATION ---
    // Check if user exists
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized: User not identified" });
    }

    let resume = await Resume.findOne({ user: req.user.id });

    if (resume) {
      // UPDATE EXISTING
      console.log("4. Updating existing resume...");
      resume.personalInfo = personalInfo;
      resume.summary = summary;
      resume.experience = experience;
      resume.education = education;
      resume.projects = projects;
      resume.skills = skills;
      resume.themeColor = themeColor;
      
      const updatedResume = await resume.save();
      console.log("5. Success: Resume updated");
      return res.status(200).json(updatedResume);
    } else {
      // CREATE NEW
      console.log("4. Creating new resume...");
      const newResume = new Resume({
        user: req.user.id,
        personalInfo,
        summary,
        experience,
        education,
        projects,
        skills,
        themeColor
      });
      
      const savedResume = await newResume.save();
      console.log("5. Success: Resume created");
      return res.status(201).json(savedResume);
    }

  } catch (error) {
    console.error("!!! SERVER ERROR !!!", error);
    
    // Send specific error message to frontend to help debug
    res.status(500).json({ 
        message: "Server error while saving resume", 
        error: error.message 
    });
  }
};

// Get User's Resume
exports.getMyResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: "No resume found" });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Resume
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ user: req.user.id });
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    // Optional: Delete the image file associated with it
    if (resume.personalInfo && resume.personalInfo.image) {
      const fileName = resume.personalInfo.image.split("/").pop();
      const filePath = path.join(__dirname, "../uploads/resume", fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};