import React from "react";
import { motion } from "framer-motion";

export default function AnimatedBin() {
  return (
    <motion.div
      className="animated-bin"
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <img src="/assets/waste-bin.png" alt="Waste Bin" className="bin-img" />
    </motion.div>
  );
}
