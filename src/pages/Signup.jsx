import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [err, setErr] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("eco_users") || "[]");
    if (users.find(u => u.email === email)) {
      setErr("Email already registered.");
      return;
    }
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("eco_users", JSON.stringify(users));
    localStorage.setItem("eco_current", JSON.stringify({ username, email }));
    nav("/dashboard");
  };

  return (
    <div style={{ maxWidth: 520, margin: "20px auto" }} className="card">
      <h2>Create Account</h2>
      <form onSubmit={handleSignup} style={{ display: "grid", gap: 10 }}>
        <input required placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input required placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" style={{ background: "var(--eco-green)", color: "white", padding: "8px 12px", borderRadius: 8 }}>Sign Up</button>
        {err && <div style={{ color: "red" }}>{err}</div>}
      </form>
    </div>
  );
}
