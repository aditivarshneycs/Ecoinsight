import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SafeLottie from "../components/SafeLottie";

export default function Home() {
  const current = JSON.parse(localStorage.getItem("eco_current") || "null");
  const greeting = current ? `Hello, ${current.firstName}` : null;

  return (
    <div>
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "space-between", maxWidth: 1100, margin: "12px auto" }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 34, color: "var(--eco-green)", marginBottom: 8 }}>Classify. Learn. Recycle Smarter.</h1>
          <p style={{ color: "#456", fontSize: 16, lineHeight: 1.6 }}>Upload a photo, get instant AI-driven classification, learn how to dispose correctly, and track your environmental impact. EcoInsight turns everyday actions into measurable change.</p>
          <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
            {greeting ? (
              <>
                <div style={{ alignSelf: "center", fontWeight: 600, fontSize: 18 }}>{greeting}</div>
                <Link to="/dashboard" style={{ background: "var(--eco-green)", color: "white", padding: "10px 16px", borderRadius: 12 }}>Go to Dashboard</Link>
              </>
            ) : (
              <>
                <Link to="/signup" style={{ background: "var(--eco-green)", color: "white", padding: "10px 16px", borderRadius: 12 }}>Create Your Account</Link>
                <Link to="/login" style={{ padding: "10px 16px", borderRadius: 12, border: "2px solid var(--eco-green)" }}>Already have an account?</Link>
              </>
            )}
          </div>
        </div>

        <div style={{ width: 360 }}>
          <div style={{ background: "linear-gradient(180deg, #fff 0%, #f0fff3 100%)", padding: 18, borderRadius: 16 }}>
            <SafeLottie icon="🌿" label="AI Powered" />
            <div style={{ marginTop: 12 }}>
              <img src="/assets/hero-illustration.png" alt="hero" style={{ width: "100%", borderRadius: 12 }} />
            </div>
          </div>
        </div>
      </motion.section>

      <section style={{ maxWidth: 1100, margin: "28px auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          <div className="card">
            <img src="/assets/recycle.svg" alt="ai" style={{ width: 64 }} />
            <h3>Instant AI Classification</h3>
            <p>Get immediate suggestions and confidence scores for proper disposal.</p>
          </div>
          <div className="card">
            <img src="/assets/eco-graph.png" alt="dashboard" style={{ width: 64 }} />
            <h3>Measure Impact</h3>
            <p>CO₂ estimates, eco points, and breakdowns to keep you motivated.</p>
          </div>
          <div className="card">
            <img src="/assets/community.png" alt="community" style={{ width: 64 }} />
            <h3>Learn & Share</h3>
            <p>Practical tips that help you reduce waste everyday.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
