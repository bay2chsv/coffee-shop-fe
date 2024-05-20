// utils/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";
import { baseAPI } from "./constant";
import Swal from "sweetalert2";
const axiosInstance = axios.create({
  baseURL: baseAPI, // Your NestJS API base URL
});

axiosInstance.interceptors.response.use(
  (config) => {
    if (config.status === 201) {
      Swal.fire({
        title: "Success!",
        text: `${config.data.message}`,
        icon: "success",
      });
    }
    return config;
  },
  (error) => {
    console.log("Error details:", error);
    if (error && error.response && error.response.status) {
      if (error.response.status === 401) {
        Swal.fire({
          title: "Unauthorized 401",
          text: `${error.response.data.message}`,
          icon: "error",
        });
        if (error.response.status === 403) {
          Swal.fire({
            title: "Forbidden 403",
            text: `${error.response.data.message}`,
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          title: "Failed",
          text: `${error.response.data.message}`,
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Failed",
        text: `An unknown error occurred.`,
        icon: "error",
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
