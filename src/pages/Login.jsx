import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// API import (your backend connection)
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // save token
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");

      console.log("User:", res.data.user);
      console.log("Token:", res.data.token);

      // redirect
      navigate("/dashboard");

    } catch (err) {
      console.error("Login error:", err);
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md shadow-lg space-y-5"
      >
        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-zinc-400 text-center text-sm">
          Login to continue to MasonDev
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-zinc-300 transition"
        >
          Login
        </button>

        {/* Register Redirect */}
        <p className="text-center text-zinc-400 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-white font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}