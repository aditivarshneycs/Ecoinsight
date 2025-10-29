import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const loc = useLocation();
  const nav = useNavigate();
  const current = JSON.parse(localStorage.getItem("eco_current") || "null");

  const logout = () => {
    localStorage.removeItem("eco_current");
    nav("/login");
  };

  return (
    <motion.header
      className="navbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ fontWeight: 700, color: "var(--eco-green)", fontSize: 18 }}>EcoInsight ♻️</div>
        <div style={{ color: "#547d5a" }}>Classify • Learn • Recycle</div>
      </div>

      <nav className="nav-links" style={{ alignItems: "center" }}>
        <Link className={loc.pathname === "/" || loc.pathname === "/home" ? "active" : ""} to="/home">Home</Link>
        <Link className={loc.pathname === "/dashboard" ? "active" : ""} to="/dashboard">Dashboard</Link>
        <Link className={loc.pathname === "/upload" ? "active" : ""} to="/upload">Upload</Link>
        <Link className={loc.pathname === "/history" ? "active" : ""} to="/history">History</Link>
        <Link className={loc.pathname === "/awareness" ? "active" : ""} to="/awareness">Awareness</Link>

        {current ? (
          <>
            <Link to="/profile" style={{ marginLeft: 8 }}>Hello, {current.firstName}</Link>
            <button onClick={logout} style={{ marginLeft: 8, background: "transparent", border: "1px solid #e6bcbc", padding: "6px 10px", borderRadius: 8, cursor: "pointer", color: "#c33" }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginLeft: 8 }}>Log in</Link>
            <Link to="/signup" style={{ marginLeft: 8, background: "var(--eco-green)", color: "#fff", padding: "8px 12px", borderRadius: 12 }}>Sign up</Link>
          </>
        )}
      </nav>
    </motion.header>
  );
}
