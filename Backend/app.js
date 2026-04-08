const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// Test route (optional)
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

module.exports = app;