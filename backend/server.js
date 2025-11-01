const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Storage setup for uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Mock AI Classification Logic ---
function classifyWasteAI(fileName) {
  const lower = fileName.toLowerCase();
  if (lower.includes("food") || lower.includes("banana") || lower.includes("apple"))
    return { type: "Organic Waste", bin: "Green Bin" };
  else if (lower.includes("plastic") || lower.includes("bottle") || lower.includes("paper"))
    return { type: "Recyclable Waste", bin: "Blue Bin" };
  else
    return { type: "Non-Recyclable Waste", bin: "Red Bin" };
}

// --- Routes ---
app.get("/", (req, res) => {
  res.send("EcoInsight Backend is Running ✅");
});

app.post("/classify", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded" });

  const result = classifyWasteAI(req.file.originalname);
  res.json({
    message: "Image classified successfully",
    result,
  });
});

// --- Start Server ---
const PORT = 5000;
app.listen(PORT, () => console.log(`🌍 Server running on http://localhost:${PORT}`));
