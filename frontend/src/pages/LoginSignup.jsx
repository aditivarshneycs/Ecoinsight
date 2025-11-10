import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { authAPI } from "../utils/api";
import { ToastContainer } from "../components/Toast";
import "./LoginSignup.css";

export default function LoginSignup() {
  const location = useLocation();
  const [isSignup, setIsSignup] = useState(location.pathname === "/signup");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toasts, setToasts] = useState([]);
  const navigate = useNavigate();

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, duration }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    setIsSignup(location.pathname === "/signup");
    setError("");
    setForm({ name: "", email: "", password: "", confirm: "" });
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        if (form.password.length < 6) {
          setError("Password must be at least 6 characters long");
          addToast("Password must be at least 6 characters long", "error");
          setLoading(false);
          return;
        }
        if (form.password !== form.confirm) {
          setError("Passwords do not match");
          addToast("Passwords do not match", "error");
          setLoading(false);
          return;
        }
        const data = await authAPI.register(form.name, form.email, form.password);
        localStorage.setItem("eco_user", JSON.stringify({
          token: data.token,
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          ecoPoints: data.user.ecoPoints || 0,
        }));
        addToast(`Welcome ${form.name}! Account created successfully.`, "success");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        const data = await authAPI.login(form.email, form.password);
        localStorage.setItem("eco_user", JSON.stringify({
          token: data.token,
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          ecoPoints: data.user.ecoPoints || 0,
        }));
        addToast(`Welcome back, ${data.user.name}!`, "success");
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (err) {
      console.error("Auth error:", err);
      const errorMsg = err.message || "An error occurred. Please try again.";
      setError(errorMsg);
      addToast(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = (toSignup) => {
    setIsSignup(toSignup);
    setError("");
    setForm({ name: "", email: "", password: "", confirm: "" });
    navigate(toSignup ? "/signup" : "/login");
  };

  return (
    <div className="auth-container">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Left Side - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="auth-left"
      >
        <div className="auth-left-content">
          <img
            src="/assets/hero-illustration.png"
            alt="EcoInsight"
            onError={(e) => {
              e.target.style.display = "none";
              const parent = e.target.parentElement;
              if (parent && !parent.querySelector(".fallback-icon")) {
                const icon = document.createElement("div");
                icon.className = "fallback-icon";
                icon.style.cssText = "font-size: 120px; margin-bottom: 32px;";
                icon.textContent = "🌿";
                parent.insertBefore(icon, e.target);
              }
            }}
          />
          <h2>
            {isSignup ? "Begin Your Green Journey" : "Welcome Back to EcoInsight"}
          </h2>
          <p>
            {isSignup
              ? "Join the community making our planet cleaner, one upload at a time 🌱"
              : "Continue your eco-friendly journey and track your environmental impact 🌍"}
          </p>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="auth-right"
      >
        <div className="auth-form-wrapper">
          <h2>{isSignup ? "Create Account" : "Log In"}</h2>
          <p className="subtitle">
            {isSignup
              ? "Sign up to start classifying waste and earning eco points"
              : "Enter your credentials to access your account"}
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="auth-error"
              >
                {error}
              </motion.div>
            )}

            {isSignup && (
              <div className="auth-form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  disabled={loading}
                  autoComplete="name"
                />
              </div>
            )}

            <div className="auth-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder={isSignup ? "Create a password (min. 6 characters)" : "Enter your password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                disabled={loading}
                autoComplete={isSignup ? "new-password" : "current-password"}
                minLength={6}
              />
            </div>

            {isSignup && (
              <div className="auth-form-group">
                <label htmlFor="confirm">Confirm Password</label>
                <input
                  id="confirm"
                  type="password"
                  placeholder="Confirm your password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  required
                  disabled={loading}
                  autoComplete="new-password"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="auth-submit-btn"
            >
              {loading && <span className="spinner"></span>}
              {loading
                ? (isSignup ? "Creating Account..." : "Logging In...")
                : (isSignup ? "Create Account" : "Log In")}
            </button>

            <p className="auth-switch">
              {isSignup ? (
                <>
                  Already have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSwitch(false);
                    }}
                  >
                    Log In
                  </a>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSwitch(true);
                    }}
                  >
                    Sign Up
                  </a>
                </>
              )}
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
