import API from "./api";

/* BACKEND REGISTER */
export const backendRegister = async (
  name,
  email,
  password
) => {
  const res = await API.post("/auth/register", {
    name,
    email,
    password,
  });

  localStorage.setItem("token", res.data.token);

  return res.data;
};

/* BACKEND LOGIN */
export const backendLogin = async (
  email,
  password
) => {
  const res = await API.post("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("token", res.data.token);

  return res.data;
};