import React, { useState, useEffect } from "react";

export default function History() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const h = JSON.parse(localStorage.getItem("eco_history") || "[]");
    setItems(h);
  }, []);

  const remove = (id) => {
    const filtered = items.filter(i => i.id !== id);
    setItems(filtered);
    localStorage.setItem("eco_history", JSON.stringify(filtered));
  };

  if (items.length === 0) {
    return <div className="card" style={{ maxWidth: 800, margin: "12px auto" }}>
      <h3>History</h3>
      <p>No uploads yet — start classifying waste!</p>
    </div>;
  }

  return (
    <div style={{ maxWidth: 1000, margin: "12px auto" }}>
      <h2>History</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {items.map(it => (
          <div key={it.id} className="card" style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <img src={it.thumb} alt={it.fileName} style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 8 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{it.fileName} <small style={{ color: "#666" }}>• {it.category} • {it.confidence}%</small></div>
              <div style={{ fontSize: 13, color: "#666" }}>{new Date(it.date).toLocaleString()}</div>
            </div>
            <div>
              <button onClick={() => remove(it.id)} style={{ background: "#ffecec", border: "1px solid #f5c2c2", padding: "6px 10px", borderRadius: 8 }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
