import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function validatePassword(pw) {
  if (!pw || pw.length < 6) return "Password must be at least 6 characters.";
  const special = /[!@#$%^&*(),.?":{}|<>]/g;
  if (!special.test(pw)) return "Password must include at least one special character.";
  return null;
}

export default function LoginSignup() {
  const nav = useNavigate();
  const [mode, setMode] = useState("login"); // 'login' or 'signup'

  // login fields
  const [loginId, setLoginId] = useState(""); // can be username or email
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");

  // signup fields
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupErr, setSignupErr] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const switchTo = (m) => {
    setMode(m);
    setLoginErr("");
    setSignupErr("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginErr("");
    const users = JSON.parse(localStorage.getItem("eco_users") || "[]");
    const found = users.find(u => (u.email === loginId || u.username === loginId) && u.password === loginPassword);
    if (!found) {
      setLoginErr("Invalid credentials. Please check username/email and password.");
      return;
    }
    localStorage.setItem("eco_current", JSON.stringify({ firstName: found.firstName, username: found.username, email: found.email }));
    nav("/dashboard");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupErr("");

    if (!firstName.trim() || !username.trim() || !email.trim() || !signupPassword) {
      setSignupErr("All fields are required.");
      return;
    }

    const pwErr = validatePassword(signupPassword);
    if (pwErr) {
      setSignupErr(pwErr);
      return;
    }

    const users = JSON.parse(localStorage.getItem("eco_users") || "[]");
    if (users.find(u => u.email === email)) {
      setSignupErr("An account with this email already exists.");
      return;
    }
    if (users.find(u => u.username === username)) {
      setSignupErr("Username already taken. Choose another.");
      return;
    }

    // store avatar (optional) as data URL
    if (avatarFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const avatarData = reader.result;
        const newUser = { firstName, username, email, password: signupPassword, avatar: avatarData };
        users.push(newUser);
        localStorage.setItem("eco_users", JSON.stringify(users));
        localStorage.setItem("eco_current", JSON.stringify({ firstName, username, email }));
        nav("/dashboard");
      };
      reader.readAsDataURL(avatarFile);
    } else {
      const newUser = { firstName, username, email, password: signupPassword, avatar: null };
      users.push(newUser);
      localStorage.setItem("eco_users", JSON.stringify(users));
      localStorage.setItem("eco_current", JSON.stringify({ firstName, username, email }));
      nav("/dashboard");
    }
  };

  return (
    <div style={{ maxWidth: 920, margin: "20px auto", display: "grid", gridTemplateColumns: "1fr 420px", gap: 24 }}>
      <div style={{ alignSelf: "center" }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <button onClick={() => switchTo("login")} style={{ padding: "8px 12px", borderRadius: 8, background: mode === "login" ? "var(--eco-green)" : "#fff", color: mode === "login" ? "#fff" : "#333", border: "1px solid #e6e6e6" }}>Login</button>
          <button onClick={() => switchTo("signup")} style={{ padding: "8px 12px", borderRadius: 8, background: mode === "signup" ? "var(--eco-green)" : "#fff", color: mode === "signup" ? "#fff" : "#333", border: "1px solid #e6e6e6" }}>Sign Up</button>
        </div>

        {mode === "login" ? (
          <motion.form onSubmit={handleLogin} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card">
            <h2>Login</h2>
            <input placeholder="Username or Email" value={loginId} onChange={e => setLoginId(e.target.value)} required />
            <input placeholder="Password" type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button type="submit" style={{ background: "var(--eco-green)", color: "#fff", padding: "8px 12px", borderRadius: 8 }}>Login</button>
              <button type="button" onClick={() => { setLoginId(""); setLoginPassword(""); }} style={{ padding: "8px 12px", borderRadius: 8 }}>Clear</button>
            </div>
            {loginErr && <div style={{ color: "red", marginTop: 8 }}>{loginErr}</div>}
          </motion.form>
        ) : (
          <motion.form onSubmit={handleSignup} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card">
            <h2>Create Account</h2>
            <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input placeholder="Password (min 6 chars + special char)" type="password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required />
            <div style={{ marginTop: 8 }}>
              <label style={{ fontSize: 14, color: "#666" }}>Upload avatar (optional):</label>
              <input type="file" accept="image/*" onChange={e => setAvatarFile(e.target.files[0])} />
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button type="submit" style={{ background: "var(--eco-green)", color: "#fff", padding: "8px 12px", borderRadius: 8 }}>Sign Up</button>
              <button type="button" onClick={() => { setFirstName(""); setUsername(""); setEmail(""); setSignupPassword(""); setAvatarFile(null); }} style={{ padding: "8px 12px", borderRadius: 8 }}>Clear</button>
            </div>
            {signupErr && <div style={{ color: "red", marginTop: 8 }}>{signupErr}</div>}
          </motion.form>
        )}
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ alignSelf: "center" }}>
        <div className="card" style={{ textAlign: "center" }}>
          <h3 style={{ color: "var(--eco-green)" }}>Welcome to EcoInsight</h3>
          <p style={{ color: "#555" }}>Join now to start classifying waste, earn eco points, and track your environmental impact. Your data is stored locally for this demo.</p>
          <img src="/assets/hero-illustration.png" alt="signup-hero" style={{ width: "100%", borderRadius: 12, marginTop: 12 }} />
        </div>
      </motion.div>
    </div>
  );
}
