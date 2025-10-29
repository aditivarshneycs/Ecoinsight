import React from "react";

export default function Card({ title, subtitle, children }) {
  return (
    <div className="card">
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      {subtitle && <div style={{ color: "#567", marginBottom: 8 }}>{subtitle}</div>}
      {children}
    </div>
  );
}
