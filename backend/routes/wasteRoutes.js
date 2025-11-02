import express from "express";
import { uploadWaste, getWasteHistory } from "../controllers/wasteController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, uploadWaste);
router.get("/history/:userId", protect, getWasteHistory);

export default router;
