import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const loc = useLocation();
  const nav = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const current = JSON.parse(localStorage.getItem("eco_user") || "null");
  const isAuthenticated = current && current.token;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    localStorage.removeItem("eco_user");
    setMobileMenuOpen(false);
    nav("/login");
  };

  // Navigation items based on auth state
  const publicNavItems = [
    { label: "Home", to: "/home", icon: "🏠" },
    { label: "Awareness", to: "/awareness", icon: "🌱" },
    { label: "Instructions", to: "/instructions", icon: "📖" },
    { label: "Log in", to: "/login", icon: "🔐" },
    { label: "Sign up", to: "/signup", icon: "✨" },
  ];

  const privateNavItems = [
    { label: "Dashboard", to: "/dashboard", icon: "📊" },
    { label: "Upload", to: "/upload", icon: "📤" },
    { label: "History", to: "/history", icon: "📜" },
    { label: "Redeem", to: "/redeem", icon: "🎁" },
    { label: "Achievements", to: "/achievements", icon: "🏆" },
    { label: "Profile", to: "/profile", icon: "👤" },
  ];

  const navItems = isAuthenticated ? privateNavItems : publicNavItems;

  const isActive = (path) => {
    if (path === "/home" || path === "/") {
      return loc.pathname === "/home" || loc.pathname === "/";
    }
    return loc.pathname === path;
  };

  return (
    <>
      <motion.header
        className="navbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
          {/* Logo */}
          <Link 
            to="/" 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 8, 
              textDecoration: "none",
              zIndex: 1001
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span style={{ fontSize: "28px" }}>🌿</span>
            <div style={{ fontWeight: 700, color: "var(--eco-green)", fontSize: "22px" }}>
              EcoInsight
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="nav-links" style={{ display: "flex", gap: 8, marginLeft: 24 }}>
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={isActive(item.to) ? "active" : ""}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 8,
                    transition: "all 0.2s ease",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated && (
                <button
                  onClick={logout}
                  style={{
                    marginLeft: 8,
                    background: "transparent",
                    border: "1px solid #f2cfcf",
                    padding: "10px 16px",
                    borderRadius: 8,
                    cursor: "pointer",
                    color: "#c33",
                    fontWeight: 600,
                    fontSize: "14px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#fee";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Logout
                </button>
              )}
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: mobileMenuOpen ? "var(--eco-green)" : "rgba(46,139,87,0.08)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                color: mobileMenuOpen ? "white" : "var(--eco-green)",
                transition: "all 0.2s ease",
                marginLeft: "auto",
              }}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </motion.header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
                top: "70px",
              }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed",
                top: "70px",
                left: 0,
                right: 0,
                background: "white",
                zIndex: 1000,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                borderTop: "1px solid rgba(46, 139, 87, 0.1)",
                maxHeight: "calc(100vh - 70px)",
                overflowY: "auto",
              }}
            >
              <nav style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 8,
                      color: isActive(item.to) ? "var(--eco-green)" : "#333",
                      fontWeight: isActive(item.to) ? 600 : 500,
                      background: isActive(item.to) ? "rgba(46, 139, 87, 0.1)" : "transparent",
                      marginBottom: 4,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontSize: "15px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive(item.to)) {
                        e.target.style.background = "rgba(46, 139, 87, 0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(item.to)) {
                        e.target.style.background = "transparent";
                      }
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
                {isAuthenticated && (
                  <button
                    onClick={logout}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 8,
                      border: "1px solid #f2cfcf",
                      background: "transparent",
                      color: "#c33",
                      fontWeight: 600,
                      fontSize: "15px",
                      cursor: "pointer",
                      marginTop: 8,
                      marginBottom: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#fee";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>🚪</span>
                    Logout
                  </button>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
