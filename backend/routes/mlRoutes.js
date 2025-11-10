import express from "express";
import multer from "multer";
import { classifyWaste } from "../controllers/mlController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", protect, upload.single("file"), classifyWaste);

export default router;