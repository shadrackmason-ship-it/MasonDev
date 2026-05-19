import API from "./api";

/* =========================
   REGISTER
========================= */
export const signUp = async (name, email, password) => {
  const res = await API.post("/auth/register", {
    name,
    email,
    password,
  });

  return res.data;
};

/* =========================
   LOGIN
========================= */
export const login = async (email, password) => {
  const res = await API.post("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("token", res.data.token);
  return res.data;
};

/* =========================
   LOGOUT
========================= */
export const logout = () => {
  localStorage.removeItem("token");
};