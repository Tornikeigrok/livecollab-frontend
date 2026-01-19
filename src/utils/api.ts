import Cookies from "js-cookie";

const API = import.meta.env.VITE_API_URL;

// Helper to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = Cookies.get("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// GET request
export const apiGet = async (endpoint: string) => {
  const res = await fetch(`${API}${endpoint}`, {
    headers: getAuthHeaders(),
  });
  return res;
};

// POST request
export const apiPost = async (endpoint: string, data?: object) => {
  const res = await fetch(`${API}${endpoint}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: data ? JSON.stringify(data) : undefined,
  });
  return res;
};

// For socket connection URL
export const getSocketURL = () => API;

export default API;