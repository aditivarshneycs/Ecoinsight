import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const loc = useLocation();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const current = JSON.parse(localStorage.getItem("eco_current") || "null");

  const logout = () => {
    localStorage.removeItem("eco_current");
    nav("/login");
  };

  return (
    <>
      <motion.header
        className="navbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "rgba(46,139,87,0.08)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18
            }}
          >
            ☰
          </button>

          <div style={{ marginLeft: 6, fontWeight: 700, color: "var(--eco-green)" }}>EcoInsight</div>
        </div>

        <nav className="nav-links" style={{ alignItems: "center" }}>
          <Link className={loc.pathname === "/home" || loc.pathname === "/" ? "active" : ""} to="/home">Home</Link>
          <Link className={loc.pathname === "/awareness" ? "active" : ""} to="/awareness">Awareness</Link>
          <Link className={loc.pathname === "/instructions" ? "active" : ""} to="/instructions">Instructions</Link>
          <Link className={loc.pathname === "/redeem" ? "active" : ""} to="/redeem">Redeem</Link>

          {current ? (
            <>
              <Link to="/profile" style={{ marginLeft: 12 }}>Hello, {current.firstName}</Link>
              <button onClick={logout} style={{ marginLeft: 12, background: "transparent", border: "1px solid #f2cfcf", padding: "6px 10px", borderRadius: 8, cursor: "pointer", color: "#c33" }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginLeft: 12 }}>Log in</Link>
              <Link to="/signup" style={{ marginLeft: 12, background: "var(--eco-green)", color: "#fff", padding: "8px 12px", borderRadius: 12 }}>Sign up</Link>
            </>
          )}
        </nav>
      </motion.header>

      <Sidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
