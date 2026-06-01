require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

console.log("🚀 Server starting...");

// ----------------------
// MEMORY DATABASE (NO MONGO)
// ----------------------
let history = [];

// ----------------------
// BASIC ROUTE
// ----------------------
app.get("/", (req, res) => {
  res.send("AI SaaS Backend Running 🚀");
});

// ----------------------
// AUTH (MOCK)
// ----------------------
app.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  res.json({
    message: "User registered successfully 🚀",
    user: { email },
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  res.json({
    message: "Login successful 🚀",
    token: "demo-token-123",
  });
});

// ----------------------
// AI CONTENT GENERATOR
// ----------------------
app.post("/api/ai/generate", (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt required" });
  }

  const result = `
🔥 AI GENERATED CONTENT

Topic: ${prompt}

👉 ${prompt} is a powerful business idea.
👉 AI can automate this easily.
👉 You can build SaaS around it.
`;

  history.push({
    id: Date.now(),
    type: "content",
    prompt,
    result,
  });

  res.json({ result });
});

// ----------------------
// AI BUSINESS IDEA GENERATOR
// ----------------------
app.post("/api/ai/business-idea", (req, res) => {
  const { budget } = req.body;

  if (!budget) {
    return res.status(400).json({
      message: "Budget is required",
    });
  }

  const result = `
💡 AI BUSINESS IDEAS

Budget: ${budget} PKR

1️⃣ Software House
- Web Development Services
- Mobile App Development
- AI Automation Solutions

2️⃣ Digital Marketing Agency
- Social Media Management
- SEO Services
- Content Creation

3️⃣ E-Commerce Store
- Online Products
- Dropshipping
- Local Brand Building

Estimated Monthly Potential:
50,000 - 300,000+ PKR
`;

  history.push({
    id: Date.now(),
    type: "business",
    prompt: `Budget: ${budget}`,
    result,
  });

  res.json({ result });
});

// ----------------------
// HISTORY API
// ----------------------
app.get("/api/ai/history", (req, res) => {
  res.json(history);
});

// ----------------------
// START SERVER
// ----------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});