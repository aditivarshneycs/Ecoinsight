import express from "express";
import { getUserPoints, getUserProfile, redeemPoints } from "../controllers/userController.js";
import { getUserAchievements } from "../controllers/achievementController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/points", protect, getUserPoints);
router.get("/profile", protect, getUserProfile);
router.post("/redeem", protect, redeemPoints);
router.get("/achievements", protect, getUserAchievements);

export default router;

