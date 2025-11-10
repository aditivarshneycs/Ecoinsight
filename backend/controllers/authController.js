import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Helper to check DB connection
const checkDBConnection = () => {
  return mongoose.connection.readyState === 1; // 1 = connected
};

// REGISTER
export const registerUser = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (!checkDBConnection()) {
      return res.status(503).json({ 
        message: "Database connection unavailable. Please check your MongoDB connection.",
        error: "MongoDB not connected"
      });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment variables");
      return res.status(500).json({ message: "Server configuration error. Please contact administrator." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ 
      message: "User registered successfully.",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        ecoPoints: newUser.ecoPoints || 0,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    
    // Handle specific MongoDB errors
    if (err.name === "ValidationError") {
      return res.status(400).json({ 
        message: "Validation error.",
        error: Object.values(err.errors).map(e => e.message).join(", ")
      });
    }
    
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already registered." });
    }

    res.status(500).json({ 
      message: "Server error. Please try again later.",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (!checkDBConnection()) {
      return res.status(503).json({ 
        message: "Database connection unavailable. Please check your MongoDB connection.",
        error: "MongoDB not connected"
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment variables");
      return res.status(500).json({ message: "Server configuration error. Please contact administrator." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        ecoPoints: user.ecoPoints || 0,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ 
      message: "Server error. Please try again later.",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};
