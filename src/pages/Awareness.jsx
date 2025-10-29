import React from "react";
import { motion } from "framer-motion";

export default function Awareness() {
  const points = [
    {
      title: "Segregate Waste at Source",
      img: "/assets/segregate.png",
      para: "Sort your waste into organic, recyclable, and hazardous categories. Correct segregation increases recycling rates and reduces contamination.",
      steps: ["Set up 3 bins at home", "Label them clearly", "Educate family members"]
    },
    {
      title: "Compost Organic Waste",
      img: "/assets/compost.png",
      para: "Composting turns food scraps into rich fertilizer, lowering methane emissions from landfills.",
      steps: ["Collect kitchen scraps", "Use a small bin or tumbler", "Turn the compost weekly"]
    },
    {
      title: "Avoid Single-Use Plastics",
      img: "/assets/no-plastic.png",
      para: "Single-use plastics often escape recycling systems and harm wildlife. Choose durable reusable items instead.",
      steps: ["Carry a reusable bottle", "Use cloth shopping bags", "Refuse plastic straws"]
    },
    {
      title: "Rinse & Clean Recyclables",
      img: "/assets/recycle-tips.png",
      para: "Food residue contaminates recyclable materials. A quick rinse helps recycling plants process more effectively.",
      steps: ["Rinse containers", "Flatten boxes", "Separate caps & labels if needed"]
    },
    {
      title: "Donate & Reuse",
      img: "/assets/donate.png",
      para: "Items in good condition can be reused. Donating reduces demand for new products and extends item lifecycles.",
      steps: ["Sort items by usability", "Find local charities", "Drop off or schedule a pickup"]
    },
    {
      title: "Repair Before Replace",
      img: "/assets/repair.png",
      para: "Repairing goods is often cheaper and greener than buying new ones. Small fixes add up to big savings.",
      steps: ["Learn basic repairs", "Use local repair cafes", "Find spare parts online"]
    },
    {
      title: "Buy in Bulk & Minimal Packaging",
      img: "/assets/bulk.png",
      para: "Bulk buying cuts packaging waste and often saves money. Choose refill stores when possible.",
      steps: ["Bring your own containers", "Compare per-unit prices", "Avoid individually wrapped items"]
    },
    {
      title: "Participate in Cleanups",
      img: "/assets/cleanup.png",
      para: "Community cleanups restore public spaces and raise awareness about litter and waste management.",
      steps: ["Join local groups", "Organize a neighborhood cleanup", "Share results to motivate others"]
    },
    {
      title: "Proper Disposal of Hazardous Waste",
      img: "/assets/hazard.png",
      para: "Batteries, electronics and chemicals need special handling to avoid pollution.",
      steps: ["Locate a hazardous waste drop-off", "Store safely until disposal", "Don't mix with regular trash"]
    },
    {
      title: "Educate & Advocate",
      img: "/assets/advocate.png",
      para: "Knowledge spreads change. Encourage friends, workplaces and schools to adopt better waste practices.",
      steps: ["Host a workshop", "Share tips on social media", "Support local policies"]
    }
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "12px auto" }}>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Waste Awareness & Action</motion.h2>
      <p style={{ color: "#466" }}>Below are 10 essential practices to reduce waste and protect the environment. Each point includes practical steps you can adopt today.</p>

      <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
        {points.map((p, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} className="card" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <img src={p.img} alt={p.title} style={{ width: 140, height: 100, objectFit: "cover", borderRadius: 8 }} />
            <div>
              <h3 style={{ marginTop: 0, color: "var(--eco-green)" }}>{p.title}</h3>
              <p style={{ color: "#444" }}>{p.para}</p>
              <strong>Steps:</strong>
              <ol>
                {p.steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
