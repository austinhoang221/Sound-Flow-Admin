import axios from "axios";
import { useNavigate } from "react-router";
import Endpoint from "../endpoints/endpoint";

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: Endpoint.baseUrl, // Replace with your API's base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      config.headers.Authorization = `Bearer ${JSON.parse(user).token}`;
      config.headers["X-ApplicationId"] =
        "5CFE32B3-5A2A-49FB-B2FB-8B491C109820";
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async function (error) {
    if (error?.response?.status === 401) {
      const navigate = useNavigate();
      navigate("/login");
    }
    return Promise.reject(error);
  }
);
