import { api } from "./api";
import { parseTime } from "@/lib";

export const loginAdmin = async (email: string, password: string) => {
  const res = await api.post(`/auth/login`, {
    email,
    password,
  });
  const { token, admin, expires_in } = res.data;
  const expiresInSeconds = parseTime(expires_in);
  const expiryTime = Date.now() + expiresInSeconds * 1000;

  localStorage.setItem("token", token);
  localStorage.setItem("tokenExpiry", expiryTime.toString());
  return admin;
};

export const logoutAdmin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("tokenExpiry");

  if (!token || !expirationTime) {
    return null;
  }

  const now = Date.now();
  if (now > parseInt(expirationTime, 10)) {
    logoutAdmin();
    return null;
  }
  
  return token;
};
