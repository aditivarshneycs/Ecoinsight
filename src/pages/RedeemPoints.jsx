import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const rewards = [
  { id: 1, title: "Eco Beginner Badge", cost: 50, desc: "Unlock a green badge for your profile." },
  { id: 2, title: "Reusable Bottle Coupon", cost: 150, desc: "10% off on eco-friendly bottle." },
  { id: 3, title: "Tree Donation", cost: 300, desc: "Plant a tree in your name." },
];

export default function RedeemPoints() {
  const [currentPoints, setCurrentPoints] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("eco_history") || "[]");
    const cur = JSON.parse(localStorage.getItem("eco_current") || "null");
    if (!cur) {
      setCurrentPoints(0);
      return;
    }
    // simple points calc: 10 points per upload for the user
    const userItems = history.filter(h => h.user === cur.username);
    const points = userItems.length * 10;
    setCurrentPoints(points);
  }, []);

  const handleRedeem = (r) => {
    if (currentPoints < r.cost) {
      setMessage("Not enough points for this reward.");
      setTimeout(() => setMessage(""), 2500);
      return;
    }
    // demo: deduct points locally by saving a pseudo-redemption entry
    const cur = JSON.parse(localStorage.getItem("eco_current") || "null");
    const history = JSON.parse(localStorage.getItem("eco_history") || "[]");
    const redemption = { id: Date.now(), user: cur.username, type: "redeem", reward: r.title, date: new Date().toISOString() };
    history.unshift(redemption);
    localStorage.setItem("eco_history", JSON.stringify(history));
    setCurrentPoints(prev => prev - r.cost);
    setMessage(`Redeemed ${r.title}! Check your history for confirmation.`);
    setTimeout(() => setMessage(""), 3500);
  };

  return (
    <div style={{ maxWidth: 1000, margin: "12px auto" }}>
      <h2>Redeem Eco Points</h2>
      <div style={{ marginTop: 8, marginBottom: 12, color: "#466" }}>Your Points: <strong>{currentPoints}</strong></div>
      {message && <div style={{ marginBottom: 12, color: "#2a7" }}>{message}</div>}
      <div style={{ display: "grid", gap: 12 }}>
        {rewards.map(r => (
          <motion.div key={r.id} whileHover={{ scale: 1.02 }} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700 }}>{r.title}</div>
              <div style={{ color: "#666" }}>{r.desc}</div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ fontWeight: 700 }}>{r.cost} pts</div>
              <button onClick={() => handleRedeem(r)} style={{ background: "var(--eco-green)", color: "white", padding: "8px 12px", borderRadius: 8 }}>Redeem</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
