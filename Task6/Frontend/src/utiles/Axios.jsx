import axios from "axios";

const axiosInstances = axios.create({
  baseURL: "http://localhost:3000/api/v1/user",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

export default axiosInstances;
