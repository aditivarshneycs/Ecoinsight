import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import axios from "axios";
import multer from "multer";
import FormData from "form-data";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import wasteRoutes from "./routes/wasteRoutes.js";

dotenv.config();
const app = express();

// ===== Middleware =====
app.use(express.json());
app.use(cors());

// ===== Connect to MongoDB =====
connectDB();

// ===== Upload Handling (for classification images) =====
const upload = multer({ dest: "uploads/" });

// ===== API Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/waste", wasteRoutes);

// ✅ NEW: Waste Classification Route
app.post("/api/classify", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Create a form to send image to ML service (Flask)
    const formData = new FormData();
    formData.append("image", fs.createReadStream(req.file.path));

    // Call the ML Flask API (make sure it's running on port 5001)
    const response = await axios.post("http://127.0.0.1:5001/predict", formData, {
      headers: formData.getHeaders(),
    });

    // Send ML result to frontend
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error connecting to ML service:", error.message);
    res.status(500).json({
      error: "Error connecting to ML service",
      details: error.message,
    });
  }
});

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// ===== Default Route =====
app.get("/", (req, res) => {
  res.send("🌿 EcoInsight Backend is Running with AI Classification!");
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ EcoInsight Backend running on http://localhost:${PORT}`)
);
