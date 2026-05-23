const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// =============================
// MongoDB Connection
// =============================
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected Successfully 🚀");
})
.catch((err) => {
  console.log("MongoDB Connection Error ❌");
  console.log(err.message);
});

// =============================
// Auth Routes
// =============================
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// =============================
// Test Route
// =============================
app.get("/", (req, res) => {
  res.send("AI SaaS Backend Running 🚀");
});

// =============================
// Server Start
// =============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);
});