const Resume = require("../model/ResumeModel");
const Subscription = require("../model/SubscriptionModel");

// --- HELPER: CHECK IF SPECIFIC RESUME IS ACCESSIBLE ---
const isResumeAccessAllowed = async (userId, resumeId) => {
  // 1. Check for Active Subscription
  const activeSub = await Subscription.findOne({
    user: userId,
    status: 'active',
    endDate: { $gte: new Date() }
  }).populate('plan');

  // 2. Determine Limit
  let limit = 2; // Default Free Limit
  if (activeSub && activeSub.plan) {
    limit = activeSub.plan.resumeLimit;
  }

  // If Limit is high enough (e.g., 100), just return true to save DB calls
  if (limit > 50) return { allowed: true, limit }; 

  // 3. Get ALL user's resumes sorted by CREATION DATE (Oldest First)
  // We need to know where this specific resumeId sits in the timeline
  const allResumes = await Resume.find({ user: userId })
    .sort({ createdAt: 1 }) // Oldest first
    .select('_id');

  // 4. Find the index of the requested resume
  const index = allResumes.findIndex(r => r._id.toString() === resumeId.toString());

  // 5. If resume not found (deleted?), return false
  if (index === -1) return { allowed: false, limit };

  // 6. Check if index is within limit (e.g., if limit is 2, indices 0 and 1 are allowed)
  const isAllowed = index < limit;

  return { allowed: isAllowed, limit };
};


// --- MAIN CONTROLLER FUNCTIONS ---

exports.createResume = async (req, res) => {
  try {
    // 1. Check Total Count vs Limit
    const userId = req.user.id;
    
    // Check Subscription
    const activeSub = await Subscription.findOne({
      user: userId,
      status: 'active',
      endDate: { $gte: new Date() }
    }).populate('plan');

    let limit = 2;
    if (activeSub && activeSub.plan) limit = activeSub.plan.resumeLimit;

    const resumeCount = await Resume.countDocuments({ user: userId });

    if (resumeCount >= limit) {
      return res.status(403).json({
        success: false,
        isLimitReached: true,
        message: `Free limit reached. You can only maintain ${limit} resumes.`
      });
    }

    // 2. Create
    const { title } = req.body;
    const newResume = await Resume.create({
      user: userId,
      title: title || "Untitled Resume",
      personalInfo: {},
      experience: [],
      education: [],
      projects: [],
      skills: []
    });

    res.status(201).json({ success: true, data: newResume });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL: Returns access status for each resume so Frontend knows what to lock
exports.getAllResumes = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get Subscription Logic
    const activeSub = await Subscription.findOne({
      user: userId,
      status: 'active',
      endDate: { $gte: new Date() }
    }).populate('plan');

    let limit = 2;
    if (activeSub && activeSub.plan) limit = activeSub.plan.resumeLimit;

    // 2. Get Resumes sorted by CREATION DATE first (to determine locks)
    // We fetch everything needed for dashboard + createdAt
    let resumes = await Resume.find({ user: userId })
      .select("title updatedAt createdAt personalInfo.fullName personalInfo.profession themeColor personalInfo.image")
      .sort({ createdAt: 1 }); // Oldest first to apply logic

    // 3. Map resumes to add 'isLocked' flag
    const resumesWithStatus = resumes.map((resume, index) => {
      // Convert mongoose doc to plain object
      const doc = resume.toObject();
      // It is locked if its index (based on creation time) is greater than or equal to limit
      doc.isLocked = index >= limit; 
      return doc;
    });

    // 4. Finally, sort by UpdatedAt DESC for the User Interface (Show recently edited first)
    resumesWithStatus.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    res.status(200).json({
      success: true,
      data: resumesWithStatus,
      limit: limit
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID: Enforce Security
exports.getResumeById = async (req, res) => {
  try {
    // 1. Check Access Permission first
    const accessCheck = await isResumeAccessAllowed(req.user.id, req.params.id);

    if (!accessCheck.allowed) {
      return res.status(403).json({ 
        success: false, 
        message: "This resume is locked due to plan expiry. Upgrade to access.",
        isLocked: true 
      });
    }

    // 2. Retrieve Data
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// SAVE/UPDATE: Enforce Security
exports.saveResume = async (req, res) => {
  try {
    const { resumeId, ...resumeData } = req.body;

    // 1. Check Access Permission first
    const accessCheck = await isResumeAccessAllowed(req.user.id, resumeId);
    
    if (!accessCheck.allowed) {
      return res.status(403).json({ 
        success: false, 
        message: "Cannot save changes. This resume is locked.",
        isLocked: true 
      });
    }

    // ... (Rest of your existing image handling code) ...
    if (req.file) {
      const imageUrl = `/uploads/${req.file.filename}`; 
      let personalInfo = JSON.parse(resumeData.personalInfo || '{}');
      personalInfo.image = imageUrl;
      resumeData.personalInfo = personalInfo; 
    } else {
      if (typeof resumeData.personalInfo === 'string') resumeData.personalInfo = JSON.parse(resumeData.personalInfo);
    }
    
    // Parse arrays
    if (typeof resumeData.experience === 'string') resumeData.experience = JSON.parse(resumeData.experience);
    if (typeof resumeData.education === 'string') resumeData.education = JSON.parse(resumeData.education);
    if (typeof resumeData.projects === 'string') resumeData.projects = JSON.parse(resumeData.projects);
    if (typeof resumeData.skills === 'string') resumeData.skills = JSON.parse(resumeData.skills);

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, user: req.user.id },
      { $set: resumeData },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    res.status(200).json(updatedResume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    // We usually ALLOW deleting locked resumes so users can free up space
    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    res.status(200).json({ success: true, message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};