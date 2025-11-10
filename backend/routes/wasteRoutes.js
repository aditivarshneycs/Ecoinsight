import express from "express";
import multer from "multer";
import { uploadWaste, getUserHistory } from "../controllers/wasteController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Routes
router.post("/upload", protect, upload.single("image"), uploadWaste);
router.get("/history", protect, getUserHistory);

export default router;