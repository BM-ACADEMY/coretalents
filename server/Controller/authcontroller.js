const User = require("../model/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const Subscription = require("../model/SubscriptionModel");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



// Google Login / Register Controller
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // 1. Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture, sub: googleId } = ticket.getPayload();

    // 2. Check if user exists in DB
    let user = await User.findOne({ email });

    if (user) {
      // If user exists, update their googleId/avatar if missing
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = picture;
        await user.save();
      }
    } else {
      // 3. If new user, Register them automatically
      // Create a dummy password since they use Google
      const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        name,
        email,
        password: hashedPassword,
        googleId,
        avatar: picture,
        role: "user",
        phone: "", // User can update this later in dashboard
      });
    }

    // 4. Generate JWT Token
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // 5. Send Cookie
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Google Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
      },
    });

  } catch (err) {
    res.status(500).json({ message: "Google Auth Failed", error: err.message });
  }
};



// Register
exports.register = async (req, res) => {
  try {
    // Destructure phone and role (careful with allowing role setting in public register)
    const { name, email, password, phone, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Default to 'user' if role not provided (Security: usually restrict 'admin' creation)
    const userRole = role === "admin" ? "admin" : "user";

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: userRole
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, email: user.email, role: user.role, phone: user.phone },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Logout (Unchanged)
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    // req.user is already attached by verifyToken middleware
    const user = req.user;

    // --- NEW LOGIC: Fetch Active Subscription ---
    const subscription = await Subscription.findOne({
      user: user._id,
      status: 'active',
      endDate: { $gte: new Date() } // Ensure it hasn't expired
    }).populate('plan'); // Populate plan details (like limit)
    // ---------------------------------------------

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      subscription: subscription || null, // <--- Send subscription data to frontend
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
