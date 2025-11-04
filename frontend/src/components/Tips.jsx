import React from "react";

export default function Tips() {
  const tips = [
    "Use reusable bottles and cups.",
    "Segregate your waste before disposal.",
    "Compost organic waste to reduce landfill.",
    "Avoid single-use plastics whenever possible.",
  ];

  return (
    <div className="tips">
      <h2>Eco Tips 🌱</h2>
      <ul>
        {tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
