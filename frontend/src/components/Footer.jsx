import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: "linear-gradient(135deg, rgba(46, 139, 87, 0.05) 0%, rgba(168, 230, 207, 0.05) 100%)",
        borderTop: "1px solid rgba(46, 139, 87, 0.1)",
        padding: "32px 20px",
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "32px",
            marginBottom: "24px",
          }}
        >
          {/* Brand Section */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "24px" }}>🌿</span>
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "var(--eco-green)" }}>
                EcoInsight
              </h3>
            </div>
            <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
              Making waste classification easy and rewarding. Join us in building a cleaner, greener planet.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: 600, color: "#333" }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <Link
                  to="/home"
                  style={{
                    color: "#666",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--eco-green)")}
                  onMouseLeave={(e) => (e.target.style.color = "#666")}
                >
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Link
                  to="/awareness"
                  style={{
                    color: "#666",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--eco-green)")}
                  onMouseLeave={(e) => (e.target.style.color = "#666")}
                >
                  Awareness
                </Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Link
                  to="/instructions"
                  style={{
                    color: "#666",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--eco-green)")}
                  onMouseLeave={(e) => (e.target.style.color = "#666")}
                >
                  Instructions
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: 600, color: "#333" }}>
              Features
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "8px", color: "#666", fontSize: "14px" }}>🤖 AI Classification</li>
              <li style={{ marginBottom: "8px", color: "#666", fontSize: "14px" }}>🏆 Eco Points System</li>
              <li style={{ marginBottom: "8px", color: "#666", fontSize: "14px" }}>📊 History Tracking</li>
              <li style={{ marginBottom: "8px", color: "#666", fontSize: "14px" }}>🎁 Rewards & Achievements</li>
            </ul>
          </div>

          {/* Contact/Info */}
          <div>
            <h4 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: 600, color: "#333" }}>
              About
            </h4>
            <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
              Built with ♻️ for a cleaner planet. Small actions make a big difference.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(46, 139, 87, 0.1)",
            paddingTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
            © {currentYear} EcoInsight. All rights reserved.
          </p>
          <p style={{ margin: 0, color: "#999", fontSize: "12px" }}>
            Made with 🌱 for environmental sustainability
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
