import User from "../models/User.js";

export const getUserPoints = async (req, res) => {
  try {
    const userId = req.user; // From auth middleware
    const user = await User.findById(userId).select("ecoPoints name email");
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      ecoPoints: user.ecoPoints || 0,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      ...user.toObject(),
      redemptions: user.redemptions || [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

export const redeemPoints = async (req, res) => {
  try {
    const userId = req.user;
    const { points, rewardId, rewardTitle, rewardIcon, repeatable } = req.body;

    if (!points || points <= 0) {
      return res.status(400).json({ message: "Invalid points amount." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.ecoPoints < points) {
      return res.status(400).json({ message: "Insufficient points." });
    }

    // Check if one-time reward was already redeemed
    if (repeatable === false) {
      const alreadyRedeemed = user.redemptions?.some(
        r => r.rewardId === String(rewardId)
      );
      if (alreadyRedeemed) {
        return res.status(400).json({ 
          message: "This reward can only be redeemed once. You've already redeemed it." 
        });
      }
    }

    // Deduct points
    user.ecoPoints -= points;
    
    // Add redemption to history
    if (!user.redemptions) {
      user.redemptions = [];
    }
    
    const redemption = {
      rewardId: String(rewardId),
      rewardTitle,
      rewardIcon: rewardIcon || "🎁",
      points,
      redeemedAt: new Date(),
    };
    
    user.redemptions.push(redemption);
    await user.save();

    res.status(200).json({
      message: "Points redeemed successfully.",
      ecoPoints: user.ecoPoints,
      redemption,
    });
  } catch (err) {
    console.error("Redeem points error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

