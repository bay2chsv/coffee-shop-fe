import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { BaseConfig } from "./config";
export const baseAPI = `http://${BaseConfig.BACKEND_HOST_IP}:${BaseConfig.BACKEND_HOST_PORT}/api/v1`;
export const baseAPIAuth = `http://${BaseConfig.BACKEND_HOST_IP}:${BaseConfig.BACKEND_HOST_PORT}/api/auth`;
export const baseAPIImage = `http://${BaseConfig.BACKEND_HOST_IP}:${BaseConfig.BACKEND_HOST_PORT}/api/image`;
export const accessToken = Cookies.get("accessToken");

export const getRole = async (token) => {
  if (!token) return null;
  const { info } = await jwtDecode(token);
  return info.role;
};

export const configAuth = (token) => ({
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token ?? ""}`,
  },
});
export const configImage = (token) => ({
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});
