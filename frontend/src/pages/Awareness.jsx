import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Awareness() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const points = [
    {
      title: "Segregate Waste at Source",
      img: "/assets/segregate.png",
      emoji: "🗑️",
      para: "Sort your waste into organic, recyclable, and hazardous categories. Correct segregation increases recycling rates and reduces contamination.",
      steps: ["Set up 3 bins at home", "Label them clearly", "Educate family members"],
      color: "#007bff"
    },
    {
      title: "Compost Organic Waste",
      img: "/assets/compost.png",
      emoji: "🌱",
      para: "Composting turns food scraps into rich fertilizer, lowering methane emissions from landfills.",
      steps: ["Collect kitchen scraps", "Use a small bin or tumbler", "Turn the compost weekly"],
      color: "#28a745"
    },
    {
      title: "Avoid Single-Use Plastics",
      img: "/assets/no-plastic.png",
      emoji: "🚫",
      para: "Single-use plastics often escape recycling systems and harm wildlife. Choose durable reusable items instead.",
      steps: ["Carry a reusable bottle", "Use cloth shopping bags", "Refuse plastic straws"],
      color: "#dc3545"
    },
    {
      title: "Rinse & Clean Recyclables",
      img: "/assets/recycle-tips.png",
      emoji: "♻️",
      para: "Food residue contaminates recyclable materials. A quick rinse helps recycling plants process more effectively.",
      steps: ["Rinse containers", "Flatten boxes", "Separate caps & labels if needed"],
      color: "#007bff"
    },
    {
      title: "Donate & Reuse",
      img: "/assets/donate.png",
      emoji: "📦",
      para: "Items in good condition can be reused. Donating reduces demand for new products and extends item lifecycles.",
      steps: ["Sort items by usability", "Find local charities", "Drop off or schedule a pickup"],
      color: "#17a2b8"
    },
    {
      title: "Repair Before Replace",
      img: "/assets/repair.png",
      emoji: "🔧",
      para: "Repairing goods is often cheaper and greener than buying new ones. Small fixes add up to big savings.",
      steps: ["Learn basic repairs", "Use local repair cafes", "Find spare parts online"],
      color: "#ffc107"
    },
    {
      title: "Buy in Bulk & Minimal Packaging",
      img: "/assets/bulk.png",
      emoji: "📦",
      para: "Bulk buying cuts packaging waste and often saves money. Choose refill stores when possible.",
      steps: ["Bring your own containers", "Compare per-unit prices", "Avoid individually wrapped items"],
      color: "#6f42c1"
    },
    {
      title: "Participate in Cleanups",
      img: "/assets/cleanup.png",
      emoji: "🧹",
      para: "Community cleanups restore public spaces and raise awareness about litter and waste management.",
      steps: ["Join local groups", "Organize a neighborhood cleanup", "Share results to motivate others"],
      color: "#20c997"
    },
    {
      title: "Proper Disposal of Hazardous Waste",
      img: "/assets/hazard.png",
      emoji: "⚠️",
      para: "Batteries, electronics and chemicals need special handling to avoid pollution.",
      steps: ["Locate a hazardous waste drop-off", "Store safely until disposal", "Don't mix with regular trash"],
      color: "#fd7e14"
    },
    {
      title: "Educate & Advocate",
      img: "/assets/advocate.png",
      emoji: "📚",
      para: "Knowledge spreads change. Encourage friends, workplaces and schools to adopt better waste practices.",
      steps: ["Host a workshop", "Share tips on social media", "Support local policies"],
      color: "#2E8B57"
    }
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "linear-gradient(135deg, rgba(46, 139, 87, 0.1) 0%, rgba(168, 230, 207, 0.1) 100%)",
          borderRadius: "20px",
          marginBottom: "40px",
          border: "1px solid rgba(46, 139, 87, 0.2)",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>🌱</div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", color: "var(--eco-green)", marginBottom: "16px", fontWeight: 700 }}>
          Waste Awareness & Action
        </h1>
        <p style={{ color: "#666", fontSize: "clamp(14px, 2vw, 18px)", lineHeight: 1.7, maxWidth: 700, margin: "0 auto" }}>
          Discover 10 essential practices to reduce waste and protect the environment. Each practice includes practical steps you can adopt today to make a positive impact.
        </p>
      </motion.div>

      {/* Awareness Points Grid */}
      <div style={{ display: "grid", gap: "24px", marginTop: "32px" }}>
        {points.map((p, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: idx * 0.08 }} 
            className="card" 
            style={{ 
              display: "flex", 
              flexDirection: isMobile ? "column" : "row",
              gap: "24px", 
              alignItems: "flex-start",
              padding: "28px",
              borderLeft: `4px solid ${p.color || "var(--eco-green)"}`,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(4px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
            }}
          >
            {/* Image/Icon Container */}
            <div
              style={{
                width: isMobile ? "100%" : "180px",
                height: isMobile ? "200px" : "140px",
                borderRadius: "16px",
                background: `linear-gradient(135deg, ${p.color || "var(--eco-green)"}20, ${p.color || "var(--eco-green)"}10)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img 
                src={p.img} 
                alt={p.title}
                onError={(e) => {
                  // Fallback to emoji if image fails to load
                  e.target.style.display = "none";
                  const parent = e.target.parentElement;
                  if (parent && !parent.querySelector('.emoji-fallback')) {
                    const emojiDiv = document.createElement('div');
                    emojiDiv.className = 'emoji-fallback';
                    emojiDiv.style.cssText = 'font-size: 64px; position: absolute;';
                    emojiDiv.textContent = p.emoji || "🌱";
                    parent.appendChild(emojiDiv);
                  }
                }}
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                }} 
              />
              {!p.img && (
                <div style={{ fontSize: "64px" }}>{p.emoji || "🌱"}</div>
              )}
            </div>
            
            {/* Content */}
            <div style={{ flex: 1 }}>
              <h3 style={{ 
                marginTop: 0, 
                color: p.color || "var(--eco-green)", 
                fontSize: "24px", 
                marginBottom: "12px",
                fontWeight: 700
              }}>
                {p.title}
              </h3>
              <p style={{ 
                color: "#666", 
                lineHeight: 1.8, 
                marginBottom: "20px", 
                fontSize: "16px" 
              }}>
                {p.para}
              </p>
              <div style={{ 
                background: `linear-gradient(135deg, ${p.color || "var(--eco-green)"}15, ${p.color || "var(--eco-green)"}05)`, 
                padding: "16px 20px", 
                borderRadius: "12px",
                border: `1px solid ${p.color || "var(--eco-green)"}30`
              }}>
                <strong style={{ 
                  color: p.color || "var(--eco-green)", 
                  display: "block", 
                  marginBottom: "12px",
                  fontSize: "16px"
                }}>
                  📋 Action Steps:
                </strong>
                <ol style={{ margin: 0, paddingLeft: "24px", color: "#555", lineHeight: 1.8 }}>
                  {p.steps.map((s, i) => (
                    <li key={i} style={{ marginBottom: "8px", fontSize: "15px" }}>{s}</li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: "48px",
          padding: "32px",
          background: "linear-gradient(135deg, var(--eco-green), #65b87a)",
          borderRadius: "16px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: "12px", fontSize: "28px" }}>Ready to Make a Difference?</h2>
        <p style={{ marginBottom: "24px", fontSize: "16px", opacity: 0.95 }}>
          Start classifying waste and tracking your environmental impact today!
        </p>
      </motion.div>
    </div>
  );
}
