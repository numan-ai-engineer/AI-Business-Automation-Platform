require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

// ----------------------
// MIDDLEWARE
// ----------------------
app.use(cors());
app.use(express.json());

console.log("🚀 AI SaaS Backend Starting...");

// ----------------------
// SECRET KEY
// ----------------------
const JWT_SECRET = "ai_saas_secret_key_123";

// ----------------------
// MEMORY DATABASE (TEMP)
// ----------------------
let users = [];
let history = [];

// ----------------------
// HOME ROUTE
// ----------------------
app.get("/", (req, res) => {
  res.send("AI SaaS Backend Running 🚀");
});

// ----------------------
// JWT MIDDLEWARE (PROTECTION)
// ----------------------
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// ----------------------
// REGISTER API
// ----------------------
app.post("/api/auth/register", (req, res) => {
  const { email, password, firstName, lastName, phone, country } = req.body;

  const userExists = users.find((u) => u.email === email);

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({
    id: Date.now(),
    email,
    password,
    firstName,
    lastName,
    phone,
    country,
  });

  res.json({ message: "User registered successfully 🚀" });
});

// ----------------------
// LOGIN API (JWT)
// ----------------------
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful 🚀",
    token,
  });
});

// ----------------------
// PROTECTED DASHBOARD API
// ----------------------
app.get("/api/dashboard", auth, (req, res) => {
  res.json({
    message: "Welcome to protected dashboard 🚀",
    user: req.user,
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

👉 ${prompt} is a powerful idea
👉 You can build SaaS around it
👉 AI can automate this process
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
// BUSINESS IDEA API
// ----------------------
app.post("/api/ai/business-idea", (req, res) => {
  const { budget } = req.body;

  const result = `
💡 BUSINESS IDEAS

Budget: ${budget} PKR

1. SaaS Startup
2. AI Automation Agency
3. E-commerce Store
4. Freelancing Agency

🔥 High profit potential in 3–6 months
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
// EMAIL GENERATOR API
// ----------------------
app.post("/api/ai/email", (req, res) => {
  const { purpose, tone } = req.body;

  const result = `
📧 AI GENERATED EMAIL

Purpose: ${purpose}
Tone: ${tone}

Hello,

I hope you are doing well.

This email is regarding ${purpose}.

Kind regards,
AI Assistant
`;

  history.push({
    id: Date.now(),
    type: "email",
    prompt: purpose,
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
  console.log(`🚀 Server running on port ${PORT}`);
});