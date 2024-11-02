import axios from "axios";

const API_URL = "https://tendencias-g-escolar-back.vercel.app/api/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
