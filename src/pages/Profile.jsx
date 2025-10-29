import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const current = JSON.parse(localStorage.getItem("eco_current") || "null");
  const history = JSON.parse(localStorage.getItem("eco_history") || "[]").filter(h => h.user === (current?.username || ""));

  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem("eco_current");
    nav("/login");
  };

  if (!current) {
    return <div className="card" style={{ maxWidth: 700, margin: "12px auto" }}>
      <h3>Please log in to view your profile.</h3>
    </div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: "12px auto" }}>
      <div className="card" style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <div style={{ width: 92, height: 92, borderRadius: 12, background: "var(--mint)" }} />
        <div>
          <h2 style={{ margin: 0 }}>{current.firstName}</h2>
          <div style={{ color: "#666" }}>{current.email}</div>
          <div style={{ marginTop: 8 }}>Uploads: <strong>{history.length}</strong></div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={logout} style={{ background: "#ffdddd", border: "1px solid #f5c2c2", padding: "8px 12px", borderRadius: 8 }}>Logout</button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <h3>Your Recent Uploads</h3>
        {history.length === 0 && <div className="card">No uploads yet</div>}
        {history.slice(0, 6).map(h => (
          <div key={h.id} className="card" style={{ marginTop: 8, display: "flex", gap: 12 }}>
            <img src={h.thumb} alt={h.fileName} style={{ width: 100, height: 72, objectFit: "cover", borderRadius: 8 }} />
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
