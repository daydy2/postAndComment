import axios from "axios";
import userSlice from "../store/store";


//http://localhost:5000/
//https://new-mern-app.onrender.com
const instance = axios.create({
  baseURL: "https://new-mern-app.onrender.com",
  headers: { "Content-Type": "application/json", "X-Custom-Header": "value" },
});

instance.interceptors.request.use(
  (config) => {
    const token = userSlice.getState().token;
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
