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
import mlRoutes from "./routes/mlRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();
const app = express();

// ===== CORS Configuration =====
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Connect to MongoDB =====
connectDB();

// ===== Routes (moved after CORS) =====
app.use("/api/classify", mlRoutes);

// ===== Upload Handling (for classification images) =====
const upload = multer({ dest: "uploads/" });

// ===== API Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/waste", wasteRoutes);
app.use("/api/user", userRoutes);

// Serve uploaded files statically (for temporary files before Cloudinary upload)
app.use("/uploads", express.static("uploads"));

// ===== Default Route =====
app.get("/", (req, res) => {
  res.send("🌿 EcoInsight Backend is Running with AI Classification!");
});

// ===== Start Server =====
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`✅ EcoInsight Backend running on http://localhost:${PORT}`)
);