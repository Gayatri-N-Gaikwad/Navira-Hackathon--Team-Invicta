const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
const authRoutes = require("./routes/auth.routes");
const quizRoutes = require("./routes/quiz.routes");
const trainingRoutes = require("./routes/train.routes");
const analyzeRoute = require("./routes/analyzeRoute");
const helpRoute = require("./routes/helpRoute");
const dashboardRoute = require("./routes/dashboardRoute");

app.use("/api/quiz", quizRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/analyze", analyzeRoute);
app.use("/api/help", helpRoute);
app.use("/api/dashboard", dashboardRoute);

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

module.exports = app;