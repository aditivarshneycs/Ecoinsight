const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

// Helper function to get auth token
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("eco_user") || "null");
  return user?.token || null;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Auth API
export const authAPI = {
  register: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Registration failed");
    return data;
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");
    return data;
  },
};

// Waste/Classification API
export const wasteAPI = {
  classify: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/classify`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Classification failed");
    return data;
  },

  getHistory: async () => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/waste/history`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch history");
    return data;
  },
};

// User API
export const userAPI = {
  getPoints: async () => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/user/points`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch points");
    return data;
  },

  getProfile: async () => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch profile");
    return data;
  },

  redeemPoints: async (points, rewardId, rewardTitle, rewardIcon, repeatable) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/user/redeem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ points, rewardId, rewardTitle, rewardIcon, repeatable }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to redeem points");
    return data;
  },

  getAchievements: async () => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/user/achievements`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch achievements");
    return data;
  },
};

