import { api } from "./api";

export const loginAdmin = async (email: string, password: string) => {
  const res = await api.post(`/auth/login`, {
    email,
    password,
  });
  const { token, admin } = res.data;
  localStorage.setItem("token", token);
  return admin;
};

export const logoutAdmin = () => {
  localStorage.removeItem("token");
};

export const getToken = () => localStorage.getItem("token");
