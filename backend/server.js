require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

console.log("Server starting in SAFE MODE (no MongoDB)");

// Test route
app.get("/", (req, res) => {
  res.send("AI SaaS Backend Running (Safe Mode) 🚀");
});

// Mock Register API
app.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  return res.json({
    message: "User registered successfully (mock mode)",
    user: { email }
  });
});

// Mock Login API
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  return res.json({
    message: "Login successful (mock mode)",
    token: "demo-token-123456"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});