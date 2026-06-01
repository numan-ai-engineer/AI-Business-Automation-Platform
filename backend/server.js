require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

console.log("🚀 Server starting...");

// ----------------------
// MEMORY DATABASE
// ----------------------
let history = [];

// ----------------------
// BASE ROUTE
// ----------------------
app.get("/", (req, res) => {
  res.send("AI SaaS Backend Running 🚀");
});

// ----------------------
// AUTH
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

  const result = `
🔥 AI CONTENT

Topic: ${prompt}

👉 ${prompt} is a powerful business idea.
👉 AI can automate this easily.
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
// BUSINESS IDEA GENERATOR
// ----------------------
app.post("/api/ai/business-idea", (req, res) => {
  const { budget } = req.body;

  const result = `
💡 BUSINESS IDEAS

Budget: ${budget}

1. Software House
2. Digital Agency
3. E-Commerce Store
`;

  history.push({
    id: Date.now(),
    type: "business",
    prompt: budget,
    result,
  });

  res.json({ result });
});

// ----------------------
// EMAIL WRITER (NEW)
// ----------------------
app.post("/api/ai/email", (req, res) => {
  const { purpose, tone } = req.body;

  const result = `
📧 AI GENERATED EMAIL

Subject: Regarding ${purpose}

Dear Sir/Madam,

I hope you are doing well.

I am writing regarding ${purpose}.
My tone is ${tone} and I would like to express my interest.

Thank you for your time.

Best Regards,
[Your Name]
`;

  history.push({
    id: Date.now(),
    type: "email",
    prompt: `${purpose} | ${tone}`,
    result,
  });

  res.json({ result });
});

// ----------------------
// HISTORY
// ----------------------
app.get("/api/ai/history", (req, res) => {
  res.json(history);
});

// ----------------------
app.listen(5000, () => {
  console.log("Server running on port 5000");
});