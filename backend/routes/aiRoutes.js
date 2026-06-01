const express = require("express");
const router = express.Router();

// Fake AI logic (later OpenAI replace کریں گے)
router.post("/generate", (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt required" });
  }

  const result = `
🔥 AI Generated Content:

Topic: ${prompt}

- This is a sample AI-generated paragraph about ${prompt}.
- You can expand this into full blog, ad copy or marketing content.
- SaaS automation is the future of business.
`;

  res.json({ result });
});

module.exports = router;