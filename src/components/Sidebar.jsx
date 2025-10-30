import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ open, onClose }) {
  const menu = [
    { label: "Home", to: "/home" },
    { label: "Instructions", to: "/instructions" },
    { label: "Upload", to: "/upload" },
    { label: "Awareness", to: "/awareness" },
    { label: "History", to: "/history" },
    { label: "Redeem Points", to: "/redeem" },
    { label: "Profile", to: "/profile" },
    { label: "Login / Sign Up", to: "/login" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: "fixed", inset: 0, background: "#000", zIndex: 50 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
              width: 280,
              background: "#f7fff8",
              zIndex: 60,
              padding: 18,
              boxShadow: "4px 0 18px rgba(0,0,0,0.08)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ fontWeight: 700, color: "var(--eco-green)" }}>Menu</div>
              <button onClick={onClose} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 18 }}>✕</button>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {menu.map(m => (
                <Link onClick={onClose} key={m.to} to={m.to} style={{ padding: "10px 12px", borderRadius: 8, color: "#2d5d3a" }}>
                  {m.label}
                </Link>
              ))}
            </nav>

            <div style={{ marginTop: 24, fontSize: 13, color: "#446" }}>
              <div style={{ marginBottom: 6, fontWeight: 600 }}>Quick Actions</div>
              <div style={{ display: "flex", gap: 8 }}>
                <Link to="/profile" onClick={onClose} style={{ padding: "8px 10px", borderRadius: 8, background: "rgba(46,139,87,0.08)" }}>My Profile</Link>
                <Link to="/redeem" onClick={onClose} style={{ padding: "8px 10px", borderRadius: 8, background: "rgba(46,139,87,0.06)" }}>Redeem</Link>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
