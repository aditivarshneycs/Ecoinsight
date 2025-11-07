import express from "express";
import multer from "multer";
import { classifyWaste } from "../controllers/mlController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), classifyWaste);

export default router;
