import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../utils/api";

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("eco_user") || "null");
        if (!user || !user.token) {
          navigate("/login");
          return;
        }

        const data = await userAPI.getAchievements();
        setAchievements(data.achievements || []);
      } catch (err) {
        console.error("Error fetching achievements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ maxWidth: 1200, margin: "12px auto", textAlign: "center", padding: "40px" }}>
        <div style={{ fontSize: "24px" }}>🔄 Loading achievements...</div>
      </div>
    );
  }

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progress = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0;

  return (
    <div style={{ maxWidth: 1200, margin: "12px auto", padding: "20px" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontSize: "32px", color: "var(--eco-green)", marginBottom: "8px" }}>
          🏆 Achievements
        </h1>
        <p style={{ color: "#666", marginBottom: "24px" }}>
          Unlock achievements by using EcoInsight and making a positive environmental impact!
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
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎯</div>
        <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>
          {unlockedCount} / {totalCount} Unlocked
        </div>
        <div style={{ 
          background: "rgba(255, 255, 255, 0.3)", 
          borderRadius: "10px", 
          height: "12px", 
          marginTop: "16px",
          overflow: "hidden"
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              background: "white",
              height: "100%",
              borderRadius: "10px",
            }}
          />
        </div>
        <div style={{ marginTop: "12px", fontSize: "14px", opacity: 0.9 }}>
          {Math.round(progress)}% Complete
        </div>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
            style={{
              textAlign: "center",
              padding: "24px",
              border: achievement.unlocked ? "3px solid #ffd700" : "2px solid #e0e0e0",
              background: achievement.unlocked 
                ? "linear-gradient(135deg, #fff9e6 0%, #ffffff 100%)" 
                : "#fafafa",
              opacity: achievement.unlocked ? 1 : 0.7,
              position: "relative",
            }}
          >
            {achievement.unlocked && (
              <div style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                fontSize: "20px",
              }}>
                ✅
              </div>
            )}
            <div style={{ 
              fontSize: "64px", 
              marginBottom: "12px",
              filter: achievement.unlocked ? "none" : "grayscale(100%)",
            }}>
              {achievement.icon}
            </div>
            <h3 style={{ 
              marginBottom: "8px", 
              color: achievement.unlocked ? "#333" : "#999",
              fontSize: "20px",
            }}>
              {achievement.title}
            </h3>
            <p style={{ 
              color: achievement.unlocked ? "#666" : "#999",
              fontSize: "14px",
              lineHeight: 1.5,
            }}>
              {achievement.description}
            </p>
            {achievement.unlockedAt && (
              <div style={{ 
                marginTop: "12px", 
                fontSize: "12px", 
                color: "#888",
                fontStyle: "italic",
              }}>
                Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

