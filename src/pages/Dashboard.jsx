import React, { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("eco_history") || "[]"));
  }, []);

  const total = history.length;
  const recyclable = history.filter(h => h.category === "Recyclable").length;
  const organic = history.filter(h => h.category === "Organic").length;

  return (
    <div style={{ maxWidth: 1000, margin: "12px auto" }}>
      <h2>Dashboard</h2>
      <div className="grid cols-3" style={{ marginTop: 12 }}>
        <Card title="Total Classified" subtitle={`${total} items`} />
        <Card title="Recyclable vs Organic" subtitle={`${recyclable} vs ${organic}`} />
        <Card title="Eco Points" subtitle={`${total * 10} pts`} />
      </div>
      <div style={{ marginTop: 18 }}>
        <h3>Recent Activity</h3>
        {history.slice(0, 5).map(h => (
          <div key={h.id} style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
            <img src={h.thumb} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 8 }} />
            <div>
              <div style={{ fontWeight: 700 }}>{h.fileName}</div>
              <div style={{ color: "#666", fontSize: 13 }}>{h.category} • {new Date(h.date).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
