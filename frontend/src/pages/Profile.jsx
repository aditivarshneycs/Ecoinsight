import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { wasteAPI, userAPI } from "../utils/api";

export default function Profile() {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [redemptions, setRedemptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("eco_user") || "null");
        if (!user || !user.token) {
          nav("/login");
          return;
        }

        const [historyData, profileData, achievementsData] = await Promise.all([
          wasteAPI.getHistory(),
          userAPI.getProfile(),
          userAPI.getAchievements().catch(() => ({ achievements: [] })),
        ]);

        setCurrent(profileData);
        setHistory(historyData || []);
        setEcoPoints(profileData.ecoPoints || 0);
        setRedemptions(profileData.redemptions || []);
        setAchievements(achievementsData.achievements || []);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nav]);

  const logout = () => {
    localStorage.removeItem("eco_user");
    nav("/login");
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 1200, margin: "12px auto", textAlign: "center", padding: "40px" }}>
        <div style={{ fontSize: "24px" }}>🔄 Loading...</div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="card" style={{ maxWidth: 700, margin: "12px auto" }}>
        <h3>Please log in to view your profile.</h3>
      </div>
    );
  }

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const totalUploads = history.length;
  const recyclableCount = history.filter(h => 
    h.wasteType === "Recyclable" || h.wasteType === "recyclable"
  ).length;
  const organicCount = history.filter(h => 
    h.wasteType === "Organic" || h.wasteType === "organic"
  ).length;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{
          background: "linear-gradient(135deg, var(--eco-green), #65b87a)",
          color: "white",
          padding: "32px",
          marginBottom: "24px",
          borderRadius: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "48px",
              fontWeight: "700",
              border: "4px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            {current.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <h1 style={{ margin: 0, fontSize: "32px", marginBottom: "8px" }}>{current.name}</h1>
            <div style={{ fontSize: "16px", opacity: 0.9, marginBottom: "16px" }}>{current.email}</div>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "4px" }}>
                  {ecoPoints}
                </div>
                <div style={{ fontSize: "14px", opacity: 0.9 }}>Eco Points</div>
              </div>
              <div>
                <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "4px" }}>
                  {totalUploads}
                </div>
                <div style={{ fontSize: "14px", opacity: 0.9 }}>Classifications</div>
              </div>
              <div>
                <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "4px" }}>
                  {unlockedAchievements.length}
                </div>
                <div style={{ fontSize: "14px", opacity: 0.9 }}>Achievements</div>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={logout}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                padding: "12px 24px",
                borderRadius: "10px",
                cursor: "pointer",
                color: "white",
                fontWeight: "600",
                fontSize: "15px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card"
          style={{ textAlign: "center", padding: "20px" }}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>♻️</div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: "#007bff" }}>{recyclableCount}</div>
          <div style={{ color: "#666", fontSize: "14px" }}>Recyclable</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="card"
          style={{ textAlign: "center", padding: "20px" }}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>🌱</div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: "#28a745" }}>{organicCount}</div>
          <div style={{ color: "#666", fontSize: "14px" }}>Organic</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="card"
          style={{ textAlign: "center", padding: "20px" }}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>🏆</div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: "#ffd700" }}>{unlockedAchievements.length}</div>
          <div style={{ color: "#666", fontSize: "14px" }}>Achievements</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="card"
          style={{ textAlign: "center", padding: "20px" }}
        >
          <div style={{ fontSize: "32px", marginBottom: "8px" }}>🎁</div>
          <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--eco-green)" }}>{redemptions.length}</div>
          <div style={{ color: "#666", fontSize: "14px" }}>Redeemed Items</div>
        </motion.div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" }}>
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "24px", color: "#333", margin: 0 }}>Recent Activity</h2>
            <Link
              to="/history"
              style={{
                color: "var(--eco-green)",
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              View All →
            </Link>
          </div>
          <div className="card" style={{ padding: "20px" }}>
            {history.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
                <p>No classifications yet.</p>
                <Link
                  to="/upload"
                  style={{
                    display: "inline-block",
                    marginTop: "12px",
                    background: "var(--eco-green)",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Start Classifying
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {history.slice(0, 5).map((h, index) => (
                  <motion.div
                    key={h._id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      display: "flex",
                      gap: "12px",
                      padding: "12px",
                      borderRadius: "8px",
                      background: "#f8f9fa",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f0f0f0";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f8f9fa";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {h.imageUrl && (
                      <img
                        src={h.imageUrl}
                        alt="Waste"
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "600", fontSize: "14px", marginBottom: "4px" }}>
                        {h.wasteType || "Unknown"}
                      </div>
                      <div style={{ color: "#666", fontSize: "12px" }}>
                        {new Date(h.uploadedAt || h.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "24px", color: "#333", margin: 0 }}>Achievements</h2>
            <Link
              to="/achievements"
              style={{
                color: "var(--eco-green)",
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              View All →
            </Link>
          </div>
          <div className="card" style={{ padding: "20px" }}>
            {unlockedAchievements.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>🏆</div>
                <p>No achievements unlocked yet.</p>
                <p style={{ fontSize: "14px", marginTop: "8px" }}>Start uploading to unlock achievements!</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "12px" }}>
                {unlockedAchievements.slice(0, 6).map((achievement, idx) => (
                  <motion.div
                    key={achievement.id || idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    style={{
                      textAlign: "center",
                      padding: "12px",
                      background: "linear-gradient(135deg, #fff9e6, #ffffff)",
                      borderRadius: "12px",
                      border: "2px solid #ffd700",
                    }}
                  >
                    <div style={{ fontSize: "32px", marginBottom: "4px" }}>{achievement.icon}</div>
                    <div style={{ fontSize: "11px", fontWeight: "600", color: "#333" }}>
                      {achievement.title}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Redeemed Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginTop: "24px" }}
      >
        <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "16px" }}>Redeemed Rewards</h2>
        {redemptions.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎁</div>
            <p style={{ color: "#666", marginBottom: "16px" }}>No rewards redeemed yet.</p>
            <Link
              to="/redeem"
              style={{
                display: "inline-block",
                background: "var(--eco-green)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 12px rgba(46, 139, 87, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Redeem Points
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
            {redemptions.map((redemption, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card"
                style={{
                  padding: "20px",
                  textAlign: "center",
                  border: "2px solid var(--eco-green)",
                  background: "linear-gradient(135deg, rgba(46, 139, 87, 0.05), rgba(168, 230, 207, 0.05))",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>
                  {redemption.rewardIcon || "🎁"}
                </div>
                <h3 style={{ margin: 0, fontSize: "18px", color: "#333", marginBottom: "8px" }}>
                  {redemption.rewardTitle}
                </h3>
                <div style={{ color: "#666", fontSize: "14px", marginBottom: "8px" }}>
                  {redemption.points} points
                </div>
                <div style={{ color: "#999", fontSize: "12px" }}>
                  {new Date(redemption.redeemedAt).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: "32px" }}
      >
        <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "16px" }}>Quick Actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <Link
            to="/upload"
            className="card"
            style={{
              textAlign: "center",
              padding: "24px",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(46, 139, 87, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📤</div>
            <div style={{ fontWeight: "600", fontSize: "16px" }}>Upload Waste</div>
          </Link>
          <Link
            to="/history"
            className="card"
            style={{
              textAlign: "center",
              padding: "24px",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(46, 139, 87, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📜</div>
            <div style={{ fontWeight: "600", fontSize: "16px" }}>View History</div>
          </Link>
          <Link
            to="/redeem"
            className="card"
            style={{
              textAlign: "center",
              padding: "24px",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(46, 139, 87, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎁</div>
            <div style={{ fontWeight: "600", fontSize: "16px" }}>Redeem Points</div>
          </Link>
          <Link
            to="/achievements"
            className="card"
            style={{
              textAlign: "center",
              padding: "24px",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(46, 139, 87, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🏆</div>
            <div style={{ fontWeight: "600", fontSize: "16px" }}>View Achievements</div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
