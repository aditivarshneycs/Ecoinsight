import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer className="footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div>Small actions make a big difference 🌎 — EcoInsight</div>
      <div style={{ fontSize: 12, color: "#6b8b6b", marginTop: 6 }}>Made with ♻️ by EcoInsight</div>
    </motion.footer>
  );
}
