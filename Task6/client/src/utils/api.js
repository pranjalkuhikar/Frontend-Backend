import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // This is required for cookies to be sent
});

// Interceptor to handle CSRF token
api.interceptors.request.use((config) => {
  // Get CSRF token from cookie
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN"))
    ?.split("=")[1];

  if (token) {
    // Add CSRF token to headers
    config.headers["CSRF-Token"] = token;
  }
  return config;
});

export default api;
