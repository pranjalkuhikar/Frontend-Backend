import axios from "axios";
const url = import.meta.env.VITE_BASE_URL;
console.log(url);
const axiosInstance = axios.create({
  baseURL: url,
});

export default axiosInstance;
