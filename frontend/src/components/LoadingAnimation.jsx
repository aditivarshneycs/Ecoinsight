// src/components/LoadingAnimation.jsx
import React from "react";
import { motion } from "framer-motion";

const LoadingAnimation = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
    style={{
      width: 60,
      height: 60,
      borderRadius: "50%",
      border: "6px solid #A8E6CF",
      borderTopColor: "#2E8B57",
      margin: "30px auto",
    }}
  />
);

export default LoadingAnimation;
