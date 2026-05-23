const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

// Protected Dashboard Route
router.get("/", authMiddleware, (req, res) => {

  res.json({
    message: "Welcome to Protected Dashboard 🚀",
    user: req.user
  });

});

module.exports = router;