import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { wasteAPI } from "../utils/api";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("eco_user") || "null");
        if (!user || !user.token) {
          navigate("/login");
          return;
        }

        const data = await wasteAPI.getHistory();
        setHistory(data || []);
      } catch (err) {
        console.error("Error fetching history:", err);
        setError("Failed to load history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  const getWasteTypeColor = (type) => {
    const typeLower = (type || "").toLowerCase();
    if (typeLower.includes("recyclable")) return "#007bff";
    if (typeLower.includes("organic")) return "#28a745";
    if (typeLower.includes("hazardous")) return "#ff0000";
    if (typeLower.includes("non")) return "#dc3545";
    return "#666";
  };

  const getWasteTypeIcon = (type) => {
    const typeLower = (type || "").toLowerCase();
    if (typeLower.includes("recyclable")) return "♻️";
    if (typeLower.includes("organic")) return "🌱";
    if (typeLower.includes("hazardous")) return "⚠️";
    if (typeLower.includes("non")) return "🚫";
    return "📦";
  };

  // Filter and search logic
  const filteredHistory = useMemo(() => {
    let filtered = [...history];

    // Filter by category
    if (filterCategory !== "all") {
      filtered = filtered.filter(item => {
        const type = (item.wasteType || "").toLowerCase();
        if (filterCategory === "recyclable") return type.includes("recyclable");
        if (filterCategory === "organic") return type.includes("organic");
        if (filterCategory === "hazardous") return type.includes("hazardous");
        if (filterCategory === "non-recyclable") return type.includes("non");
        return true;
      });
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        (item.wasteType || "").toLowerCase().includes(query) ||
        (item.description || "").toLowerCase().includes(query)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.uploadedAt || a.createdAt || 0);
      const dateB = new Date(b.uploadedAt || b.createdAt || 0);
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [history, filterCategory, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [filterCategory, searchQuery, sortBy]);

  if (loading) {
    return (
      <div style={{ maxWidth: 1200, margin: "12px auto", textAlign: "center", padding: "40px" }}>
        <div style={{ fontSize: "24px" }}>🔄 Loading history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 1200, margin: "12px auto", padding: "20px" }}>
        <div className="card" style={{ textAlign: "center", padding: "40px", background: "#fee", color: "#c33" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>❌</div>
          <h3>{error}</h3>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "16px",
              background: "var(--eco-green)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const categoryCounts = {
    all: history.length,
    recyclable: history.filter(h => (h.wasteType || "").toLowerCase().includes("recyclable")).length,
    organic: history.filter(h => (h.wasteType || "").toLowerCase().includes("organic")).length,
    hazardous: history.filter(h => (h.wasteType || "").toLowerCase().includes("hazardous")).length,
    "non-recyclable": history.filter(h => (h.wasteType || "").toLowerCase().includes("non")).length,
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontSize: "32px", color: "var(--eco-green)", marginBottom: "8px", fontWeight: 700 }}>
          📜 Classification History
        </h1>
        <p style={{ color: "#666", marginBottom: "24px", fontSize: "16px" }}>
          View all your past waste classifications and track your eco-friendly journey
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
        style={{ marginBottom: "24px", padding: "20px" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "16px" }}>
          {/* Search */}
          <div style={{ gridColumn: "1 / -1" }}>
            <input
              type="text"
              placeholder="🔍 Search by waste type or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "2px solid #e0e0e0",
                fontSize: "15px",
              }}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333", fontSize: "14px" }}>
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "2px solid #e0e0e0",
                fontSize: "15px",
                background: "white",
                cursor: "pointer",
              }}
            >
              <option value="all">All ({categoryCounts.all})</option>
              <option value="recyclable">♻️ Recyclable ({categoryCounts.recyclable})</option>
              <option value="organic">🌱 Organic ({categoryCounts.organic})</option>
              <option value="hazardous">⚠️ Hazardous ({categoryCounts.hazardous})</option>
              <option value="non-recyclable">🚫 Non-Recyclable ({categoryCounts["non-recyclable"]})</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333", fontSize: "14px" }}>
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "2px solid #e0e0e0",
                fontSize: "15px",
                background: "white",
                cursor: "pointer",
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ color: "#666", fontSize: "14px", textAlign: "center" }}>
          Showing {paginatedHistory.length} of {filteredHistory.length} classifications
        </div>
      </motion.div>

      {/* History Grid */}
      {filteredHistory.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
          style={{ textAlign: "center", padding: "60px 20px" }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>📭</div>
          <h3 style={{ fontSize: "24px", marginBottom: "8px", color: "#333" }}>
            {searchQuery || filterCategory !== "all" ? "No Results Found" : "No Classifications Yet"}
          </h3>
          <p style={{ color: "#666", marginBottom: "24px", fontSize: "16px" }}>
            {searchQuery || filterCategory !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Start classifying waste to build your history and earn eco points!"}
          </p>
          {(!searchQuery && filterCategory === "all") && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/upload")}
              style={{
                background: "var(--eco-green)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              Upload Your First Image
            </motion.button>
          )}
        </motion.div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginBottom: "24px" }}>
            {paginatedHistory.map((entry, index) => (
              <motion.div
                key={entry._id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="card"
                style={{
                  padding: "20px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  borderTop: `4px solid ${getWasteTypeColor(entry.wasteType)}`,
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                onClick={() => {
                  // Could open a modal or navigate to detail view
                }}
              >
                {entry.imageUrl && (
                  <img
                    src={entry.imageUrl}
                    alt="Waste classification"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginBottom: "16px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "24px" }}>{getWasteTypeIcon(entry.wasteType)}</span>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: getWasteTypeColor(entry.wasteType),
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    {entry.wasteType || "Unknown"}
                  </h3>
                </div>
                {entry.description && (
                  <p style={{ color: "#666", fontSize: "14px", marginBottom: "12px", lineHeight: 1.5 }}>
                    {entry.description}
                  </p>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #eee" }}>
                  <div style={{ color: "#888", fontSize: "12px" }}>
                    {new Date(entry.uploadedAt || entry.createdAt).toLocaleDateString()}
                  </div>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      background: "var(--mint)",
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                  >
                    +10 pts
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "32px" }}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "2px solid var(--eco-green)",
                  background: currentPage === 1 ? "#f0f0f0" : "white",
                  color: currentPage === 1 ? "#999" : "var(--eco-green)",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
              >
                ← Previous
              </button>
              <div style={{ padding: "10px 20px", color: "#666", fontWeight: "600" }}>
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "2px solid var(--eco-green)",
                  background: currentPage === totalPages ? "#f0f0f0" : "white",
                  color: currentPage === totalPages ? "#999" : "var(--eco-green)",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  opacity: currentPage === totalPages ? 0.5 : 1,
                }}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
