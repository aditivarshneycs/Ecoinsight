import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const current = JSON.parse(localStorage.getItem("eco_current") || "null");

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setStatus("Classifying...");
    // Simulate classification result
    setTimeout(() => {
      const types = ["Recyclable", "Organic", "Hazardous"];
      const type = types[Math.floor(Math.random() * types.length)];
      const confidence = Math.floor(75 + Math.random() * 25);
      setStatus(`Detected: ${type} (${confidence}%)`);
      // Save to history
      const history = JSON.parse(localStorage.getItem("eco_history") || "[]");
      history.unshift({
        id: Date.now(),
        user: current?.username || "guest",
        fileName: f.name,
        thumb: preview,
        category: type,
        confidence,
        date: new Date().toISOString()
      });
      localStorage.setItem("eco_history", JSON.stringify(history));
    }, 1500);
  };

  if (!current) {
    // not logged in, redirect
    navigate("/login");
    return null;
  }

  return (
    <div style={{ maxWidth: 900, margin: "12px auto" }}>
      <div className="card">
        <h2>Upload & Classify Waste</h2>
        <input type="file" accept="image/*" onChange={handleFile} />
        {preview && <div style={{ marginTop: 12 }}>
          <img src={preview} alt="preview" style={{ maxWidth: 300, borderRadius: 8 }} />
        </div>}
        {status && <div style={{ marginTop: 8 }}>{status}</div>}
      </div>
    </div>
  );
}
