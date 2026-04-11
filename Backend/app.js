const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");

const app = express();

// 🔥 CORS CONFIG (IMPORTANT for frontend connection)
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Routes
const authRoutes = require("./routes/auth.routes");
const quizRoutes = require("./routes/quiz.routes");
const trainingRoutes = require("./routes/train.routes");
const analyzeRoute = require("./routes/analyzeRoute");
const helpRoute = require("./routes/helpRoute");
const dashboardRoute = require("./routes/dashboardRoute");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/analyze", analyzeRoute);
app.use("/api/help", helpRoute);
app.use("/api/dashboard", dashboardRoute);

// Test Route
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

module.exports = app;