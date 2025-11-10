import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SafeLottie from "../components/SafeLottie";

export default function Home() {
  const navigate = useNavigate();
  const current = JSON.parse(localStorage.getItem("eco_user") || "null");
  const isAuthenticated = current && current.token;

  // Redirect logged-in users to Dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <motion.section 
        initial={{ opacity: 0, y: 18 }} 
        animate={{ opacity: 1, y: 0 }} 
        style={{ 
          display: "flex", 
          gap: 32, 
          alignItems: "center", 
          justifyContent: "space-between", 
          maxWidth: 1200, 
          margin: "40px auto",
          padding: "0 20px",
          flexWrap: "wrap"
        }}
      >
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h1 style={{ 
            fontSize: "clamp(28px, 5vw, 42px)", 
            color: "var(--eco-green)", 
            marginBottom: 16,
            fontWeight: 700,
            lineHeight: 1.2
          }}>
            Classify. Learn. Recycle Smarter.
          </h1>
          <p style={{ 
            color: "#666", 
            fontSize: "clamp(14px, 2vw, 18px)", 
            lineHeight: 1.7,
            marginBottom: 24
          }}>
            Upload a photo, get instant AI-driven classification, learn how to dispose correctly, and track your environmental impact. EcoInsight turns everyday actions into measurable change.
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
            {!isAuthenticated && (
              <>
                <Link 
                  to="/signup" 
                  style={{ 
                    background: "var(--eco-green)", 
                    color: "white", 
                    padding: "12px 24px", 
                    borderRadius: 10,
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(46, 139, 87, 0.3)",
                    transition: "all 0.3s ease"
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
                  Create Your Account
                </Link>
                <Link 
                  to="/login" 
                  style={{ 
                    padding: "12px 24px", 
                    borderRadius: 10, 
                    border: "2px solid var(--eco-green)",
                    color: "var(--eco-green)",
                    fontWeight: 600,
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "var(--eco-green)";
                    e.target.style.color = "white";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "var(--eco-green)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Already have an account?
                </Link>
              </>
            )}
          </div>
        </div>

        <div style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ 
              background: "linear-gradient(180deg, #fff 0%, #f0fff3 100%)", 
              padding: 24, 
              borderRadius: 20,
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)"
            }}
          >
            <SafeLottie icon="🌿" label="AI Powered" />
            <div style={{ marginTop: 16 }}>
              <img 
                src="/assets/hero-illustration.png" 
                alt="EcoInsight Hero" 
                style={{ 
                  width: "100%", 
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }} 
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.target.style.display = "none";
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section style={{ maxWidth: 1200, margin: "60px auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ textAlign: "center" }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🤖</div>
            <h3 style={{ marginBottom: "12px", color: "#333" }}>Instant AI Classification</h3>
            <p style={{ color: "#666", lineHeight: 1.6 }}>Get immediate suggestions and confidence scores for proper disposal.</p>
          </motion.div>
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ textAlign: "center" }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>📊</div>
            <h3 style={{ marginBottom: "12px", color: "#333" }}>Measure Impact</h3>
            <p style={{ color: "#666", lineHeight: 1.6 }}>Track eco points, waste breakdowns, and your environmental impact.</p>
          </motion.div>
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ textAlign: "center" }}
          >
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🌱</div>
            <h3 style={{ marginBottom: "12px", color: "#333" }}>Learn & Share</h3>
            <p style={{ color: "#666", lineHeight: 1.6 }}>Practical tips that help you reduce waste everyday.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
