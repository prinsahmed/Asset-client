import axios from "axios";

const api = axios.create({
  baseURL: "https://asset-server-v.vercel.app",
});

export const useAxios = () => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  return api;
};