import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token") || "";
};

const http = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    common: { Authorization: `Bearer ${getToken()}` },
  },
});

http.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer " + getToken();
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default http;
