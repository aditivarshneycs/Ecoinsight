import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Awareness from "./pages/Awareness";
import Profile from "./pages/Profile";
import LoginSignup from "./pages/LoginSignup";
import Instructions from "./pages/Instructions";
import RedeemPoints from "./pages/RedeemPoints";

function requireAuth() {
  const cur = localStorage.getItem("eco_current");
  return cur ? JSON.parse(cur) : null;
}
function PrivateRoute({ children }) {
  const user = requireAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <main style={{ padding: "24px", paddingBottom: "120px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
          <Route path="/awareness" element={<Awareness />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/redeem" element={<PrivateRoute><RedeemPoints /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<LoginSignup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
