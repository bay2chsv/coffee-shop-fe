// utils/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";
import { baseAPI } from "./constant";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: baseAPI, // Your NestJS API base URL
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 201) {
      Swal.fire({
        title: "Success!",
        text: `${response.data.message}`,
        icon: "success",
      });
    }
    const methodToCheck = ["patch", "put", "delete"];
    const isMatchingPath = methodToCheck.some((path) => {
      return response.config.method.includes(path);
    });
    // Check if the method is PATCH and status is 200
    if (response.status === 200 && isMatchingPath) {
      Swal.fire({
        title: "Update Success!",
        text: `${response.data.message}`,
        icon: "success",
      });
    }
    return response;
  },
  (error) => {
    console.log("Error details:", error);
    if (error && error.response && error.response.status) {
      let status = error.response.status;
      switch (status) {
        case 401:
          Swal.fire({
            title: "Unauthorized 401",
            text: `${error.response.data.message}`,
            icon: "error",
          });
          break;
        case 403:
          Swal.fire({
            title: "Forbidden 403",
            text: `${error.response.data.message}`,
            icon: "error",
          });
          break;
        default:
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
