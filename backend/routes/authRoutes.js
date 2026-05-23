const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");

// ===================================
// REGISTER USER
// ===================================
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // Check all fields
    if (!name || !email || !password) {

      return res.status(400).json({
        message: "Please fill all fields"
      });

    }

    // Check existing user
    const userExists = await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.json({
      message: "User Registered Successfully 🚀",
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

// ===================================
// LOGIN USER
// ===================================
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });

    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid password"
      });

    }

    // Create token
    const token = jwt.sign(
      {
        id: user._id
      },
      "mysecretkey",
      {
        expiresIn: "7d"
      }
    );

    // Success response
    res.json({
      message: "Login Successful 🚀",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

module.exports = router;