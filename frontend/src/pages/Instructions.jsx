import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Instructions() {
  const navigate = useNavigate();
  const current = JSON.parse(localStorage.getItem("eco_user") || "null");
  const isAuthenticated = current && current.token;

  const steps = [
    {
      number: "1",
      title: "Sign Up & Create Profile",
      description: "Register with your name, email, and a secure password. Your profile stores your uploads, points, and achievements.",
      icon: "👤",
    },
    {
      number: "2",
      title: "Upload Waste Images",
      description: "Go to Upload page and select an image of your waste. Our AI classifier will instantly identify the waste type.",
      icon: "📤",
    },
    {
      number: "3",
      title: "Earn Eco Points",
      description: "Each successful classification earns you 10 eco points automatically. Track your progress on the Dashboard.",
      icon: "🌿",
    },
    {
      number: "4",
      title: "View History",
      description: "See all your past uploads with images, classifications, and timestamps in your History page.",
      icon: "📜",
    },
    {
      number: "5",
      title: "Unlock Achievements",
      description: "Complete milestones to unlock achievements. Check your Achievements page to see your progress.",
      icon: "🏆",
    },
    {
      number: "6",
      title: "Redeem Points",
      description: "Exchange your eco points for rewards like badges, coupons, and certificates on the Redeem page.",
      icon: "🎁",
    },
  ];

  const tips = [
    "Upload clear photos with a single item per image for best classification results",
    "Read Awareness articles to learn more about waste management",
    "Check your achievements regularly to track your environmental impact",
    "Redeem points for rewards that support eco-friendly initiatives",
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "12px auto", padding: "20px" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontSize: "32px", color: "var(--eco-green)", marginBottom: "8px" }}>
          📖 How EcoInsight Works
        </h1>
        <p style={{ color: "#666", marginBottom: "32px", fontSize: "16px", lineHeight: 1.6 }}>
          Learn how to use EcoInsight to classify waste, earn points, and make a positive environmental impact.
        </p>
      </motion.div>

      <div style={{ display: "grid", gap: "20px", marginTop: "24px" }}>
        {steps.map((step, idx) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="card"
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "flex-start",
              padding: "24px",
            }}
          >
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, var(--eco-green), #65b87a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(46, 139, 87, 0.3)",
            }}>
              {step.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                display: "inline-block",
                background: "var(--eco-green)",
                color: "white",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: "8px",
              }}>
                Step {step.number}
              </div>
              <h3 style={{ 
                marginTop: 0, 
                color: "#333", 
                fontSize: "22px",
                marginBottom: "8px"
              }}>
                {step.title}
              </h3>
              <p style={{ color: "#666", lineHeight: 1.7, fontSize: "15px", margin: 0 }}>
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
        style={{
          marginTop: "32px",
          padding: "24px",
          background: "linear-gradient(135deg, #f0fff3 0%, #ffffff 100%)",
          border: "2px solid var(--eco-green)",
        }}
      >
        <h2 style={{ color: "var(--eco-green)", marginBottom: "16px", fontSize: "24px" }}>
          💡 Tips to Maximize Your Impact
        </h2>
        <ul style={{ margin: 0, paddingLeft: "20px", color: "#555", lineHeight: 1.8 }}>
          {tips.map((tip, i) => (
            <li key={i} style={{ marginBottom: "8px", fontSize: "15px" }}>{tip}</li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: "32px",
          textAlign: "center",
          padding: "24px",
        }}
      >
        {!isAuthenticated && (
          <>
            <p style={{ color: "#666", marginBottom: "16px", fontSize: "16px" }}>
              Ready to get started?
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                to="/signup"
                style={{
                  background: "var(--eco-green)",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  boxShadow: "0 4px 12px rgba(46, 139, 87, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 16px rgba(46, 139, 87, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 12px rgba(46, 139, 87, 0.3)";
                }}
              >
                Create Account
              </Link>
              <Link
                to="/awareness"
                style={{
                  background: "transparent",
                  color: "var(--eco-green)",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  border: "2px solid var(--eco-green)",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "var(--eco-green)";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "var(--eco-green)";
                }}
              >
                Learn More
              </Link>
            </div>
          </>
        )}
        {isAuthenticated && (
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/upload"
              style={{
                background: "var(--eco-green)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "10px",
                fontWeight: "600",
                boxShadow: "0 4px 12px rgba(46, 139, 87, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 16px rgba(46, 139, 87, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(46, 139, 87, 0.3)";
              }}
            >
              Start Classifying
            </Link>
            <Link
              to="/dashboard"
              style={{
                background: "transparent",
                color: "var(--eco-green)",
                padding: "12px 24px",
                borderRadius: "10px",
                border: "2px solid var(--eco-green)",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "var(--eco-green)";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "var(--eco-green)";
              }}
            >
              View Dashboard
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
