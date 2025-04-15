// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.107.50:5000/api', // 🔁 Replace with your local IP address or deployed backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
