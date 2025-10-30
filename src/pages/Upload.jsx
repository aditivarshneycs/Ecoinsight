import React, { useState } from "react";
import { motion } from "framer-motion";
import { classifyWaste } from "../utils/classifier";
import "./UploadPage.css";

function UploadPage() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setLoading(true);
    setResult(null);

    // Simulate AI model processing
    setTimeout(() => {
      const prediction = classifyWaste(file);
      setResult(prediction);
      setLoading(false);
    }, 2000); // 2 sec delay
  };

  return (
    <div className="upload-page">
      <h1>♻️ EcoInsight: Waste Classifier</h1>
      <p>
        Upload an image of waste to identify its type and learn how to dispose
        of it properly. Our AI helps you understand whether it’s organic,
        recyclable, or hazardous.
      </p>

      <div className="upload-box">
        <input type="file" accept="image/*" onChange={handleUpload} />
        {image && <img src={image} alt="Uploaded Waste" className="preview" />}
      </div>

      {loading && (
        <motion.div
          className="loading-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="loading-animation">🔄 Analyzing waste...</div>
          <p>Please wait while the AI classifies your waste type.</p>
        </motion.div>
      )}

      {!loading && result && (
        <motion.div
          className="result-section"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>
            Classification Result:{" "}
            <span style={{ color: result.color }}>{result.type}</span>
          </h2>

          <div
            className="bin-info"
            style={{ backgroundColor: result.color, color: "#fff" }}
          >
            <p>
              <strong>🗑 Waste Type:</strong> {result.type}
            </p>
            <p>
              <strong>🚮 Dispose:</strong> Throw it in the{" "}
              <b>{result.bin}</b>.
            </p>
            <p>
              <strong>💡 Tips to Handle:</strong>
            </p>
            <ul>
              {result.tips.map((tip, index) => (
                <li key={index}>✅ {tip}</li>
              ))}
            </ul>
          </div>

          <div className="education-section">
            <h3>🌍 Why Waste Segregation Matters</h3>
            <p>
              Segregating waste helps reduce pollution, saves natural
              resources, and makes recycling more effective. Here’s how you can
              do it easily:
            </p>
            <ul>
              <li>
                🟢 <b>Organic Waste:</b> Food scraps, peels, leaves → Compost or
                throw in <b>Green Bin</b>.
              </li>
              <li>
                🔵 <b>Recyclable Waste:</b> Paper, plastic bottles, glass →
                Clean and put in <b>Blue Bin</b>.
              </li>
              <li>
                🔴 <b>Hazardous Waste:</b> Batteries, medical waste → Dispose
                safely in <b>Red Bin</b>.
              </li>
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
