import axios from "axios";
import { getToken } from "@utils/tokenHelper";

const baseUrlFromEnv = import.meta.env.VITE_BASE_URL;
const port = import.meta.env.VITE_PORT;

const formattedBaseUrl = baseUrlFromEnv.replace(/:$/, "");
const baseURL = `${formattedBaseUrl}:${port}`;

const api = axios.create({
  baseURL,
  timeout: 20000,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
