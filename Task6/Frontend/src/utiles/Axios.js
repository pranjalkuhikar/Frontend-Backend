import axios from "axios";

const axiosInstances = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
  withCredentials: true, // Important for cookies to be sent and received
});

export default axiosInstances;
