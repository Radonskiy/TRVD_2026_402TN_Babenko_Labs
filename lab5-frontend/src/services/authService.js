import api from "./api";

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);

  const token = response.data.access_token;
  localStorage.setItem("token", token);

  // Розпарсимо payload JWT (роль і userId)
  const payload = JSON.parse(atob(token.split(".")[1]));
  localStorage.setItem("user", JSON.stringify(payload));

  return response.data;
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};