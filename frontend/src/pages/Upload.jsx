import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { wasteAPI } from "../utils/api";
import { ToastContainer } from "../components/Toast";
import "./UploadPage.css";

function UploadPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [toasts, setToasts] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!file) {
      return { valid: false, error: "No file selected" };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: "Invalid file type. Please upload JPG, PNG, or WEBP images." };
    }

    if (file.size > maxSize) {
      return { valid: false, error: "File size exceeds 10MB limit. Please upload a smaller image." };
    }

    return { valid: true };
  };

  const processFile = async (file) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error);
      addToast(validation.error, "error");
      return;
    }

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("eco_user") || "null");
    if (!user || !user.token) {
      setError("Please log in to classify waste");
      addToast("Please log in to classify waste", "warning");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setImage(file);
    setLoading(true);
    setResult(null);
    setError("");
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const data = await wasteAPI.classify(file);
      clearInterval(progressInterval);
      setProgress(100);

      const type = data.prediction;
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
        imageUrl: data.imageUrl,
        ecoPoints: data.ecoPoints,
        pointsEarned: data.pointsEarned || 10,
        wasteType: data.wasteType,
        newAchievements: data.newAchievements || [],
      });

      // Update user points in localStorage
      if (data.ecoPoints !== undefined) {
        const user = JSON.parse(localStorage.getItem("eco_user") || "{}");
        user.ecoPoints = data.ecoPoints;
        localStorage.setItem("eco_user", JSON.stringify(user));
      }

      addToast(`Successfully classified as ${data.wasteType}! +${data.pointsEarned || 10} points earned.`, "success");
      
      if (data.newAchievements && data.newAchievements.length > 0) {
        setTimeout(() => {
          addToast(`🏆 Achievement unlocked: ${data.newAchievements.map(a => a.title).join(", ")}`, "success", 5000);
        }, 1000);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      const errorMsg = err.message || "Unable to connect to backend or ML service. Please try again.";
      setError(errorMsg);
      addToast(errorMsg, "error");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const resetUpload = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError("");
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="upload-page">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontSize: "clamp(28px, 5vw, 36px)", color: "var(--eco-green)", marginBottom: "12px", fontWeight: 700 }}>
          ♻️ EcoInsight: Waste Classifier
        </h1>
        <p style={{ color: "#666", fontSize: "clamp(14px, 2vw, 16px)", marginBottom: "32px" }}>
          Upload a waste image to identify if it's recyclable, organic, hazardous, or non-recyclable.
        </p>
      </motion.div>

      {!result && (
        <div
          className="upload-box"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !loading && fileInputRef.current?.click()}
          style={{
            cursor: loading ? "not-allowed" : "pointer",
            borderColor: isDragging ? "var(--eco-green)" : undefined,
            background: isDragging 
              ? "linear-gradient(135deg, #f0fff3 0%, #e8f5e9 100%)" 
              : "linear-gradient(135deg, #ffffff 0%, #f0fff3 100%)",
            transform: isDragging ? "scale(1.02)" : "scale(1)",
            transition: "all 0.3s ease",
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            style={{ display: "none" }}
            disabled={loading}
          />
          {!preview && !loading && (
            <>
              <div style={{ fontSize: "64px", marginBottom: "16px", position: "relative", zIndex: 1 }}>
                {isDragging ? "📥" : "📤"}
              </div>
              <div style={{ fontSize: "20px", fontWeight: 600, color: "var(--eco-green)", marginBottom: "8px", position: "relative", zIndex: 1 }}>
                {isDragging ? "Drop your image here" : "Click to Upload or Drag & Drop"}
              </div>
              <div className="upload-text" style={{ position: "relative", zIndex: 1 }}>
                Supported formats: JPG, PNG, WEBP (Max 10MB)
              </div>
            </>
          )}
          {preview && !loading && (
            <img src={preview} alt="Preview" className="preview" />
          )}
        </div>
      )}

      {loading && (
        <motion.div
          className="loading-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ marginTop: "32px" }}
        >
          <div className="loading-animation">🔄 Analyzing waste...</div>
          <div style={{ marginTop: "16px", width: "100%", maxWidth: "400px", margin: "16px auto 0" }}>
            <div style={{
              width: "100%",
              height: "8px",
              background: "#e0e0e0",
              borderRadius: "4px",
              overflow: "hidden",
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, var(--eco-green), #65b87a)",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div style={{ textAlign: "center", marginTop: "8px", color: "#666", fontSize: "14px" }}>
              {progress}%
            </div>
          </div>
          <p style={{ marginTop: "16px", color: "#666" }}>Please wait while the AI classifies your waste type.</p>
        </motion.div>
      )}

      {error && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="error-message"
        >
          {error}
        </motion.div>
      )}

      {!loading && result && (
        <motion.div
          className="result-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            style={{
              background: "linear-gradient(135deg, #28a745, #20c997)",
              color: "white",
              padding: "20px 24px",
              borderRadius: "16px",
              marginBottom: "24px",
              textAlign: "center",
              boxShadow: "0 4px 16px rgba(40, 167, 69, 0.3)",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "20px", marginBottom: "8px" }}>
              🎉 +{result.pointsEarned} Eco Points Earned!
            </h3>
            <p style={{ margin: 0, fontSize: "16px", opacity: 0.95 }}>
              Total Points: <strong style={{ fontSize: "18px" }}>{result.ecoPoints}</strong>
            </p>
          </motion.div>

          {result.newAchievements && result.newAchievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                background: "linear-gradient(135deg, #ffd700, #ffed4e)",
                color: "#333",
                padding: "24px",
                borderRadius: "16px",
                marginBottom: "24px",
                textAlign: "center",
                boxShadow: "0 4px 16px rgba(255, 215, 0, 0.3)",
              }}
            >
              <h3 style={{ margin: "0 0 16px 0", fontSize: "22px", fontWeight: "700" }}>
                🏆 Achievement Unlocked!
              </h3>
              {result.newAchievements.map((achievement, idx) => (
                <div key={idx} style={{ marginBottom: idx < result.newAchievements.length - 1 ? "16px" : "0" }}>
                  <div style={{ fontSize: "48px", marginBottom: "8px" }}>{achievement.icon}</div>
                  <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{achievement.title}</div>
                  <div style={{ fontSize: "14px", opacity: 0.8 }}>{achievement.description}</div>
                </div>
              ))}
            </motion.div>
          )}

          <div className="card" style={{ marginBottom: "24px", textAlign: "center" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px", color: "#333" }}>
              Classification Result:{" "}
              <span style={{ color: result.color, fontWeight: 700 }}>{result.wasteType || result.type.toUpperCase()}</span>
            </h2>

            {result.imageUrl && (
              <img
                src={result.imageUrl}
                alt="Classified waste"
                style={{
                  maxWidth: "100%",
                  maxHeight: "400px",
                  borderRadius: "16px",
                  marginBottom: "20px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  border: `3px solid ${result.color}`,
                }}
              />
            )}
          </div>

          <div
            className="bin-info"
            style={{
              backgroundColor: result.color,
              color: "#fff",
              padding: "28px",
              borderRadius: "16px",
              marginBottom: "24px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            <p style={{ fontSize: "18px", marginBottom: "12px" }}>
              <strong>🗑 Waste Type:</strong> {result.wasteType || result.type}
            </p>
            <p style={{ fontSize: "18px", marginBottom: "12px" }}>
              <strong>🚮 Dispose In:</strong> <b>{result.bin}</b>
            </p>
            <p style={{ fontSize: "18px", marginBottom: "12px" }}>
              <strong>💡 Handling Tips:</strong>
            </p>
            <ul style={{ margin: 0, paddingLeft: "24px", fontSize: "16px", lineHeight: 1.8 }}>
              {result.tips.map((tip, i) => (
                <li key={i} style={{ marginBottom: "8px" }}>✅ {tip}</li>
              ))}
            </ul>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              className="try-again-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetUpload}
              style={{
                background: "#6c757d",
                color: "white",
                padding: "14px 28px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
                boxShadow: "0 4px 12px rgba(108, 117, 125, 0.3)",
              }}
            >
              🔁 Upload Another Image
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/history")}
              style={{
                background: "var(--eco-green)",
                color: "white",
                padding: "14px 28px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
                boxShadow: "0 4px 12px rgba(46, 139, 87, 0.3)",
              }}
            >
              📜 View History
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default UploadPage;
