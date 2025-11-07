import React, { useState } from "react";
import { motion } from "framer-motion";
import "./UploadPage.css";

function UploadPage() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file); // ✅ matches backend multer field name

      const response = await fetch("http://localhost:5000/api/classify", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Backend request failed");

      const data = await response.json();
      console.log("✅ ML Prediction:", data);

      const type = data.prediction; // ✅ backend returns { prediction: "hazardous" }

      const colorMap = {
        recyclable: "#007bff",
        organic: "#28a745",
        "non_recyclable": "#dc3545",
        hazardous: "#ff0000",
      };

      const binMap = {
        recyclable: "Blue Bin",
        organic: "Green Bin",
        "non_recyclable": "Red Bin",
        hazardous: "Hazardous Waste Bin / Dispose Safely",
      };

      const tipsMap = {
        recyclable: [
          "Clean and dry recyclables before discarding.",
          "Do not mix with food or organic waste.",
          "Sort paper, plastic, and metal separately.",
        ],
        organic: [
          "Can be composted at home or sent to municipal compost bins.",
          "Keep separate from plastics.",
          "Use biodegradable bags if needed.",
        ],
        "non_recyclable": [
          "Do not mix with recyclable items.",
          "Store in closed bags to avoid contamination.",
          "Dispose in red bin only.",
        ],
        hazardous: [
          "Do not throw in normal dustbin.",
          "Requires special handling and disposal.",
          "Return batteries or electronics to collection centers.",
        ],
      };

      setResult({
        type,
        color: colorMap[type] || "#555",
        bin: binMap[type] || "Unknown bin",
        tips: tipsMap[type] || [],
      });
    } catch (err) {
      console.error("❌ Error:", err);
      setError("Unable to connect to backend or ML service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <h1>♻️ EcoInsight: Waste Classifier</h1>
      <p>Upload a waste image to identify if it's recyclable, organic, hazardous, or non-recyclable.</p>

      <div className="upload-box">
        <input type="file" accept="image/*" onChange={handleUpload} />
        {image && <img src={image} alt="Uploaded Waste" className="preview" />}
      </div>

      {loading && (
        <motion.div className="loading-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="loading-animation">🔄 Analyzing waste...</div>
          <p>Please wait while the AI classifies your waste type.</p>
        </motion.div>
      )}

      {error && <p className="error-message">{error}</p>}

      {!loading && result && (
        <motion.div
          className="result-section"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>
            Classification Result:{" "}
            <span style={{ color: result.color }}>{result.type.toUpperCase()}</span>
          </h2>

          <div className="bin-info" style={{ backgroundColor: result.color, color: "#fff" }}>
            <p><strong>🗑 Waste Type:</strong> {result.type}</p>
            <p><strong>🚮 Dispose In:</strong> <b>{result.bin}</b></p>
            <p><strong>💡 Handling Tips:</strong></p>
            <ul>
              {result.tips.map((tip, i) => (
                <li key={i}>✅ {tip}</li>
              ))}
            </ul>
          </div>

          <motion.button
            className="try-again-btn"
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              setImage(null);
              setResult(null);
            }}
          >
            🔁 Try Another Image
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

export default UploadPage;
