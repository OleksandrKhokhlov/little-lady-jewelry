import axios from "axios";

export const loginAdmin = async (email: string, password: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/login`,
    {
      email,
      password,
    },
  );
  const { token, admin } = res.data;
  localStorage.setItem("token", token);
  return admin;
};

export const logoutAdmin = () => {
  localStorage.removeItem("token");
}

export const getToken = () => localStorage.getItem("token");
