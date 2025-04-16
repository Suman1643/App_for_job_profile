// utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://app-for-job-profile-be.vercel.app/api", // 🔁 Replace with your local IP address or deployed backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
