import User from "../models/User.js";
import Waste from "../models/Waste.js";

// Achievement definitions
export const ACHIEVEMENTS = {
  FIRST_UPLOAD: {
    id: "first_upload",
    title: "First Steps",
    description: "Uploaded your first waste image",
    icon: "🌱",
    condition: (userStats) => userStats.totalUploads >= 1,
  },
  TEN_UPLOADS: {
    id: "ten_uploads",
    title: "Dedicated Classifier",
    description: "Uploaded 10 waste images",
    icon: "📸",
    condition: (userStats) => userStats.totalUploads >= 10,
  },
  FIFTY_POINTS: {
    id: "fifty_points",
    title: "Eco Starter",
    description: "Earned 50 eco points",
    icon: "⭐",
    condition: (userStats) => userStats.totalPointsEarned >= 50,
  },
  HUNDRED_POINTS: {
    id: "hundred_points",
    title: "Eco Enthusiast",
    description: "Earned 100 eco points",
    icon: "🌟",
    condition: (userStats) => userStats.totalPointsEarned >= 100,
  },
  FIVE_HUNDRED_POINTS: {
    id: "five_hundred_points",
    title: "Eco Champion",
    description: "Earned 500 eco points",
    icon: "🏆",
    condition: (userStats) => userStats.totalPointsEarned >= 500,
  },
  RECYCLER: {
    id: "recycler",
    title: "Recycling Pro",
    description: "Classified 10 recyclable items",
    icon: "♻️",
    condition: (userStats) => userStats.recyclableCount >= 10,
  },
  ORGANIC_MASTER: {
    id: "organic_master",
    title: "Compost King",
    description: "Classified 10 organic items",
    icon: "🌿",
    condition: (userStats) => userStats.organicCount >= 10,
  },
};

// Get user statistics for achievement checking
export const getUserStats = async (userId) => {
  const user = await User.findById(userId);
  const wastes = await Waste.find({ userId });

  return {
    totalUploads: wastes.length,
    totalPoints: user.ecoPoints || 0,
    totalPointsEarned: user.totalPointsEarned || 0, // Total points ever earned (not current balance)
    recyclableCount: wastes.filter(w => 
      w.wasteType === "Recyclable" || w.wasteType === "recyclable"
    ).length,
    organicCount: wastes.filter(w => 
      w.wasteType === "Organic" || w.wasteType === "organic"
    ).length,
    hazardousCount: wastes.filter(w => 
      w.wasteType === "Hazardous" || w.wasteType === "hazardous"
    ).length,
    nonRecyclableCount: wastes.filter(w => 
      w.wasteType === "Non-Recyclable" || w.wasteType === "non_recyclable"
    ).length,
  };
};

// Check and unlock achievements - PERMANENT once unlocked
export const checkAndUnlockAchievements = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return [];

    const userStats = await getUserStats(userId);
    const newlyUnlockedAchievements = [];

    // Initialize achievements array if it doesn't exist
    if (!user.achievements) {
      user.achievements = [];
    }

    // Check each achievement
    for (const [key, achievement] of Object.entries(ACHIEVEMENTS)) {
      // Skip if already unlocked (permanent)
      const alreadyUnlocked = user.achievements.some(
        a => a.achievementId === achievement.id
      );
      
      if (alreadyUnlocked) continue;

      // Check condition - if met, unlock permanently
      if (achievement.condition(userStats)) {
        user.achievements.push({
          achievementId: achievement.id,
          achievementTitle: achievement.title,
          unlockedAt: new Date(),
        });
        newlyUnlockedAchievements.push(achievement);
      }
    }

    // Save if new achievements were unlocked
    if (newlyUnlockedAchievements.length > 0) {
      await user.save();
    }

    return newlyUnlockedAchievements;
  } catch (err) {
    console.error("Error checking achievements:", err);
    return [];
  }
};

// Get user achievements - from stored achievements (permanent)
export const getUserAchievements = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Map achievements with stored unlock status
    const achievementsList = Object.values(ACHIEVEMENTS).map(achievement => {
      const userAchievement = user.achievements?.find(
        a => a.achievementId === achievement.id
      );
      return {
        ...achievement,
        unlocked: !!userAchievement,
        unlockedAt: userAchievement?.unlockedAt || null,
      };
    });

    res.status(200).json({
      achievements: achievementsList,
      unlockedCount: achievementsList.filter(a => a.unlocked).length,
      totalCount: achievementsList.length,
    });
  } catch (err) {
    console.error("Get achievements error:", err);
    res.status(500).json({ message: "Server error." });
  }
};


