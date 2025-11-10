import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../utils/api";

const rewards = [
  { id: 1, title: "Eco Beginner Badge", cost: 50, desc: "Unlock a green badge for your profile.", icon: "🏅", repeatable: false },
  { id: 2, title: "Reusable Bottle Coupon", cost: 150, desc: "10% off on eco-friendly bottle.", icon: "🥤", repeatable: true },
  { id: 3, title: "Tree Donation", cost: 300, desc: "Plant a tree in your name.", icon: "🌳", repeatable: true },
  { id: 4, title: "Eco Warrior Badge", cost: 500, desc: "Show your commitment to the environment.", icon: "🛡️", repeatable: false },
  { id: 5, title: "Carbon Offset Certificate", cost: 1000, desc: "Official certificate for your carbon offset.", icon: "📜", repeatable: false },
];

export default function RedeemPoints() {
  const [currentPoints, setCurrentPoints] = useState(0);
  const [redemptions, setRedemptions] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("eco_user") || "null");
        if (!user || !user.token) {
          navigate("/login");
          return;
        }

        const [pointsData, profileData] = await Promise.all([
          userAPI.getPoints(),
          userAPI.getProfile().catch(() => ({ redemptions: [] })),
        ]);

        setCurrentPoints(pointsData.ecoPoints || 0);
        setRedemptions(profileData.redemptions || []);

        // Update localStorage
        user.ecoPoints = pointsData.ecoPoints || 0;
        localStorage.setItem("eco_user", JSON.stringify(user));
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleRedeem = async (r) => {
    if (currentPoints < r.cost) {
      setMessage("Not enough points for this reward.");
      setTimeout(() => setMessage(""), 2500);
      return;
    }

    // Check if one-time reward was already redeemed
    if (!r.repeatable) {
      const alreadyRedeemed = redemptions.some(
        redemption => redemption.rewardId === String(r.id)
      );
      if (alreadyRedeemed) {
        setMessage(`⚠️ ${r.title} can only be redeemed once. You've already redeemed this reward.`);
        setTimeout(() => setMessage(""), 3500);
        return;
      }
    }

    try {
      const data = await userAPI.redeemPoints(r.cost, r.id, r.title, r.icon, r.repeatable);
      
      // Update points from server response
      setCurrentPoints(data.ecoPoints);
      
      // Update redemptions list
      if (data.redemption) {
        setRedemptions(prev => [...prev, data.redemption]);
      }
      
      // Update localStorage
      const user = JSON.parse(localStorage.getItem("eco_user") || "{}");
      user.ecoPoints = data.ecoPoints;
      localStorage.setItem("eco_user", JSON.stringify(user));
      
      setMessage(`🎉 Successfully redeemed ${r.title}! ${r.cost} points have been deducted. View it in your Profile!`);
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      console.error("Redemption error:", err);
      setMessage(err.message || "Failed to redeem points. Please try again.");
      setTimeout(() => setMessage(""), 3500);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 1000, margin: "12px auto", textAlign: "center", padding: "40px" }}>
        <div style={{ fontSize: "24px" }}>🔄 Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "12px auto", padding: "20px" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontSize: "32px", color: "var(--eco-green)", marginBottom: "8px" }}>
          🎁 Redeem Eco Points
        </h1>
        <p style={{ color: "#666", marginBottom: "24px" }}>
          Exchange your eco points for exciting rewards and make a difference!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card"
        style={{
          background: "linear-gradient(135deg, var(--eco-green), #65b87a)",
          color: "white",
          padding: "24px",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "8px" }}>🌿</div>
        <div style={{ fontSize: "36px", fontWeight: "700", marginBottom: "8px" }}>
          {currentPoints} Points
        </div>
        <div style={{ fontSize: "16px", opacity: 0.9 }}>
          Available for redemption
        </div>
      </motion.div>

      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card"
          style={{
            marginBottom: "20px",
            background: message.includes("Not enough") ? "#fee" : "#efe",
            color: message.includes("Not enough") ? "#c33" : "#2a7",
            padding: "16px",
            borderRadius: "12px",
            fontWeight: "600",
          }}
        >
          {message}
        </motion.div>
      )}

      <div style={{ display: "grid", gap: "16px" }}>
        {rewards.map((r, index) => {
          const alreadyRedeemed = !r.repeatable && redemptions.some(
            redemption => redemption.rewardId === String(r.id)
          );
          const canRedeem = currentPoints >= r.cost && !alreadyRedeemed;

          return (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
              border: canRedeem ? "2px solid var(--eco-green)" : "2px solid #eee",
              opacity: alreadyRedeemed ? 0.7 : 1,
              position: "relative",
            }}
          >
            {alreadyRedeemed && (
              <div style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "#28a745",
                color: "white",
                padding: "4px 8px",
                borderRadius: "12px",
                fontSize: "11px",
                fontWeight: "600",
              }}>
                ✓ Redeemed
              </div>
            )}
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ fontSize: "40px" }}>{r.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "18px", marginBottom: "4px" }}>
                  {r.title}
                </div>
                <div style={{ color: "#666", fontSize: "14px" }}>{r.desc}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ fontWeight: 700, fontSize: "18px", color: "var(--eco-green)" }}>
                {r.cost} pts
              </div>
              <button
                onClick={() => handleRedeem(r)}
                disabled={!canRedeem}
                style={{
                  background: canRedeem ? "var(--eco-green)" : "#ccc",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: 8,
                  border: "none",
                  cursor: canRedeem ? "pointer" : "not-allowed",
                  fontWeight: "600",
                  opacity: canRedeem ? 1 : 0.6,
                }}
              >
                {alreadyRedeemed ? "Already Redeemed" : (currentPoints >= r.cost ? "Redeem" : "Insufficient Points")}
              </button>
            </div>
          </motion.div>
          );
        })}
      </div>
    </div>
  );
}
