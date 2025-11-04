import React from "react";
import { motion } from "framer-motion";

export default function SafeLottie({ icon = "♻️", label = "" }) {
  return (
    <div style={{ textAlign: "center" }}>
      <motion.div animate={{ rotate: [0, 12, -12, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: 48 }}>
        {icon}
      </motion.div>
      {label && <div style={{ color: "#466", marginTop: 8 }}>{label}</div>}
    </div>
  );
}
