import React from "react";
import { motion } from "framer-motion";

export default function Card({ title, subtitle, icon, children }) {
  return (
    <motion.div 
      className="card"
      whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
      style={{ transition: "all 0.2s" }}
    >
      {icon && <div style={{ fontSize: "32px", marginBottom: "8px" }}>{icon}</div>}
      {title && <h3 style={{ marginTop: 0, fontSize: "18px", fontWeight: "700" }}>{title}</h3>}
      {subtitle && <div style={{ color: "#567", marginBottom: 8, fontSize: "16px", fontWeight: "600" }}>{subtitle}</div>}
      {children}
    </motion.div>
  );
}
