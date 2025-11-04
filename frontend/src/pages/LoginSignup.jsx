import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
//import loginIllustration from "../assets/eco-illustration.svg"; // replace with your own green-themed image

export default function LoginSignup() {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState({ firstName: "", username: "", email: "", password: "", confirm: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      const users = JSON.parse(localStorage.getItem("eco_users") || "[]");
      if (users.some(u => u.username === form.username)) {
        alert("Username already exists!");
        return;
      }
      users.push(form);
      localStorage.setItem("eco_users", JSON.stringify(users));
      localStorage.setItem("eco_current", JSON.stringify(form));
    } else {
      const users = JSON.parse(localStorage.getItem("eco_users") || "[]");
      const found = users.find(u => u.username === form.username && u.password === form.password);
      if (!found) {
        alert("Invalid credentials");
        return;
      }
      localStorage.setItem("eco_current", JSON.stringify(found));
    }
    navigate("/dashboard");
  };

  return (
    <div className="auth-container" style={{ display: "flex", height: "100vh" }}>
      {/* Left illustration */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-left"
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #c2f0c2, #7dd47d)",
          color: "#1b4d1b",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px"
        }}
      >
        <img 
        src="https://cdn-icons-png.flaticon.com/512/7652/7652519.png" 
        alt="Eco Illustration" 
        style={{ width: "250px", height: "auto" }} 
        />
        
        <h2 style={{ fontSize: "1.8rem" }}>
          {isSignup ? "Begin Your Green Journey" : "Welcome Back to EcoInsight"}
        </h2>
        <p>Join the community making our planet cleaner, one upload at a time 🌱</p>
      </motion.div>

      {/* Right form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-right"
        style={{
          flex: 1,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "80%",
            maxWidth: "380px",
            display: "flex",
            flexDirection: "column",
            gap: "14px"
          }}
        >
          <h2 style={{ textAlign: "center", color: "#2f6b2f" }}>
            {isSignup ? "Create Account" : "Log In"}
          </h2>

          {isSignup && (
            <>
              <input type="text" placeholder="Full Name" value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
              <input type="text" placeholder="Username" value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })} required />
              <input type="email" placeholder="Email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </>
          )}

          {!isSignup && (
            <input type="text" placeholder="Username" value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })} required />
          )}

          <input type="password" placeholder="Password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} required />

          {isSignup && (
            <input type="password" placeholder="Confirm Password" value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
          )}

          <button type="submit" style={{
            background: "#2f6b2f",
            color: "white",
            padding: "10px 0",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600"
          }}>
            {isSignup ? "Create Account" : "Login"}
          </button>

          <p style={{ textAlign: "center" }}>
            {isSignup
              ? <>Already have an account?{" "}
                  <span onClick={() => setIsSignup(false)} style={{ color: "#2f6b2f", cursor: "pointer", fontWeight: "600" }}>Login</span></>
              : <>Don't have an account?{" "}
                  <span onClick={() => setIsSignup(true)} style={{ color: "#2f6b2f", cursor: "pointer", fontWeight: "600" }}>Sign up</span></>}
          </p>
        </form>
      </motion.div>
    </div>
  );
}
