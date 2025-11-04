import React from "react";
import { motion } from "framer-motion";

export default function History({ history, deleteHistory }) {
  return (
    <div className="history-container">
      <h2>📜 Classification History</h2>
      {history.length === 0 && <p>No history yet.</p>}
      {history.map((entry, index) => (
        <motion.div
          key={index}
          className="history-card"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={entry.image} alt="history" width="100" />
          <p><b>{entry.result}</b> ({entry.confidence}%)</p>
          <small>{entry.date}</small>
          <button onClick={() => deleteHistory(index)}>Delete</button>
        </motion.div>
      ))}
    </div>
  );
}
