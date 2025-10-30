// src/components/DustbinAnimation.jsx
import React from "react";
import { motion } from "framer-motion";

const DustbinAnimation = ({ type, image }) => {
  const getBinColor = () => {
    switch (type) {
      case "Recyclable":
        return "https://cdn-icons-png.flaticon.com/512/5166/5166749.png"; // Blue
      case "Organic":
        return "https://cdn-icons-png.flaticon.com/512/5166/5166750.png"; // Green
      case "Hazardous":
        return "https://cdn-icons-png.flaticon.com/512/5166/5166751.png"; // Red
      default:
        return "";
    }
  };

  return (
    <div style={{ position: "relative", textAlign: "center", marginTop: "20px" }}>
      <motion.img
        src={getBinColor()}
        alt="dustbin"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: "160px", marginBottom: "10px" }}
      />
      <motion.img
        src={image}
        alt="waste"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: [0, 80, 100], opacity: [1, 1, 0] }}
        transition={{ duration: 1.5 }}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80px",
          borderRadius: "12px",
        }}
      />
    </div>
  );
};

export default DustbinAnimation;
