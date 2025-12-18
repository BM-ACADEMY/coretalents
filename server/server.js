const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();




const connectDB = require("./Config/db");
const userRoutes = require("./Routes/userroutes");
const authRoutes = require("./Routes/authroutes");
const review = require("./Routes/Reviewroute")

const app = express();


// ================== MIDDLEWARE ==================

// Security
app.use(helmet());

// Logging
app.use(morgan("dev"));

// Body parser & cookies
app.use(express.json());
app.use(cookieParser());

// Unified CORS setup
const allowedOrigins = [process.env.CLIENT_URL, process.env.FRONTEND_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // needed to send cookies
  })
);


// Root route
app.get("/", (req, res) => {
  res.send("🚀 Single Tea India Backend is live!");
});

// ================== ROUTES ==================
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/review",review)

// ================== START SERVER ==================
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));