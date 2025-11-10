import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ message, type = "info", onClose, duration = 4000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = {
    success: {
      bg: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
      icon: "✅",
      border: "#1e7e34",
    },
    error: {
      bg: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
      icon: "❌",
      border: "#bd2130",
    },
    warning: {
      bg: "linear-gradient(135deg, #ffc107 0%, #ffb300 100%)",
      icon: "⚠️",
      border: "#e0a800",
    },
    info: {
      bg: "linear-gradient(135deg, #17a2b8 0%, #138496 100%)",
      icon: "ℹ️",
      border: "#117a8b",
    },
  };

  const toastConfig = config[type] || config.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9, x: "-50%" }}
      animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
      exit={{ opacity: 0, y: -20, scale: 0.9, x: "-50%" }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      style={{
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        background: toastConfig.bg,
        color: "white",
        padding: "16px 20px",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
        zIndex: 10000,
        maxWidth: "90%",
        width: "auto",
        minWidth: "320px",
        maxWidth: "500px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        border: `1px solid ${toastConfig.border}`,
        backdropFilter: "blur(10px)",
      }}
      role="alert"
      aria-live="assertive"
    >
      <span
        style={{
          fontSize: "22px",
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {toastConfig.icon}
      </span>
      <span
        style={{
          flex: 1,
          fontWeight: "500",
          fontSize: "15px",
          lineHeight: 1.4,
          wordBreak: "break-word",
        }}
      >
        {message}
      </span>
      <button
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClose();
          }
        }}
        aria-label="Close notification"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          border: "none",
          color: "white",
          borderRadius: "50%",
          width: "28px",
          height: "28px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          padding: 0,
          flexShrink: 0,
          transition: "all 0.2s ease",
          fontWeight: "bold",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.3)";
          e.target.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(255, 255, 255, 0.2)";
          e.target.style.transform = "scale(1)";
        }}
      >
        ×
      </button>
    </motion.div>
  );
};

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
        pointerEvents: "none",
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            style={{
              position: "absolute",
              top: `${24 + index * 80}px`,
              left: "50%",
              transform: "translateX(-50%)",
              pointerEvents: "auto",
            }}
          >
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
              duration={toast.duration}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default Toast;
