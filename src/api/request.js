import axios from "axios";
import useAuthStore from "../store/store";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const Request = async (method, url, payload) => {
  try {
    const res = await instance[method](url, payload);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default instance;
