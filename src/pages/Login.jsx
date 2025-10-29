import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("eco_users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      setErr("Invalid credentials. Try sign up.");
      return;
    }
    localStorage.setItem("eco_current", JSON.stringify({ username: found.username, email: found.email }));
    nav("/dashboard");
  };

  return (
    <div style={{ maxWidth: 520, margin: "20px auto" }} className="card">
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "grid", gap: 10 }}>
        <input required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input required placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" style={{ background: "var(--eco-green)", color: "white", padding: "8px 12px", borderRadius: 8 }}>Login</button>
        {err && <div style={{ color: "red" }}>{err}</div>}
        <div style={{ fontSize: 14 }}>Don't have an account? <Link to="/signup">Sign up</Link></div>
      </form>
    </div>
  );
}
