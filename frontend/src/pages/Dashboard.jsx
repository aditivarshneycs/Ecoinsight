import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import Card from "../components/Card";
import { wasteAPI, userAPI } from "../utils/api";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [ecoPoints, setEcoPoints] = useState(0);
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

        const [historyData, pointsData] = await Promise.all([
          wasteAPI.getHistory(),
          userAPI.getPoints(),
        ]);

        setHistory(historyData);
        setEcoPoints(pointsData.ecoPoints || 0);

        // Update localStorage with latest points
        user.ecoPoints = pointsData.ecoPoints || 0;
        localStorage.setItem("eco_user", JSON.stringify(user));
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const total = history.length;
  const recyclable = history.filter(h => 
    h.wasteType === "Recyclable" || h.wasteType === "recyclable"
  ).length;
  const organic = history.filter(h => 
    h.wasteType === "Organic" || h.wasteType === "organic"
  ).length;
  const hazardous = history.filter(h => 
    h.wasteType === "Hazardous" || h.wasteType === "hazardous"
  ).length;
  const nonRecyclable = history.filter(h => 
    h.wasteType === "Non-Recyclable" || h.wasteType === "non_recyclable"
  ).length;

  if (loading) {
    return (
      <div style={{ maxWidth: 1000, margin: "12px auto", textAlign: "center", padding: "40px" }}>
        <div style={{ fontSize: "24px" }}>🔄 Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "12px auto", padding: "20px" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontSize: "32px", color: "var(--eco-green)", marginBottom: "8px" }}>
          📊 Dashboard
        </h1>
        <p style={{ color: "#666", marginBottom: "24px" }}>
          Track your environmental impact and eco-friendly activities
        </p>
      </motion.div>

      <div className="grid cols-3" style={{ marginTop: 12, gap: "20px" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card 
            title="Total Classified" 
            subtitle={`${total} items`}
            icon="📦"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card 
            title="Eco Points" 
            subtitle={`${ecoPoints} pts`}
            icon="🌿"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/achievements" style={{ textDecoration: "none", color: "inherit" }}>
            <Card 
              title="Achievements" 
              subtitle="View all"
              icon="🏆"
            />
          </Link>
        </motion.div>
      </div>

      <div style={{ marginTop: "32px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Waste Breakdown</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <div className="card" style={{ textAlign: "center", padding: "20px" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>♻️</div>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#007bff" }}>{recyclable}</div>
            <div style={{ color: "#666", fontSize: "14px" }}>Recyclable</div>
          </div>
          <div className="card" style={{ textAlign: "center", padding: "20px" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>🌱</div>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#28a745" }}>{organic}</div>
            <div style={{ color: "#666", fontSize: "14px" }}>Organic</div>
          </div>
          <div className="card" style={{ textAlign: "center", padding: "20px" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>🚫</div>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#dc3545" }}>{nonRecyclable}</div>
            <div style={{ color: "#666", fontSize: "14px" }}>Non-Recyclable</div>
          </div>
          <div className="card" style={{ textAlign: "center", padding: "20px" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>⚠️</div>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#ff0000" }}>{hazardous}</div>
            <div style={{ color: "#666", fontSize: "14px" }}>Hazardous</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "32px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Recent Activity</h2>
        {history.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "40px" }}>
            <p style={{ color: "#666", fontSize: "16px" }}>No classifications yet. Start by uploading an image!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/upload")}
              style={{
                marginTop: "16px",
                background: "var(--eco-green)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Upload Your First Image
            </motion.button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {history.slice(0, 5).map((h, index) => (
              <motion.div
                key={h._id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
                style={{ 
                  display: "flex", 
                  gap: 16, 
                  alignItems: "center", 
                  padding: "16px",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate("/history")}
              >
                {h.imageUrl && (
                  <img 
                    src={h.imageUrl} 
                    alt="Waste" 
                    style={{ 
                      width: 100, 
                      height: 80, 
                      objectFit: "cover", 
                      borderRadius: 8,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }} 
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "4px" }}>
                    {h.wasteType || "Unknown"}
                  </div>
                  <div style={{ color: "#666", fontSize: 13 }}>
                    {new Date(h.uploadedAt || h.createdAt).toLocaleString()}
                  </div>
                  {h.description && (
                    <div style={{ color: "#888", fontSize: "12px", marginTop: "4px" }}>
                      {h.description}
                    </div>
                  )}
                </div>
                <div style={{ 
                  padding: "6px 12px", 
                  borderRadius: "20px", 
                  background: "var(--mint)",
                  fontSize: "12px",
                  fontWeight: "600"
                }}>
                  +10 pts
                </div>
              </motion.div>
            ))}
            {history.length > 5 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/history")}
                style={{
                  marginTop: "8px",
                  background: "transparent",
                  color: "var(--eco-green)",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  border: "2px solid var(--eco-green)",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                View All History ({history.length} items)
              </motion.button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
