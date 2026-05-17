import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

import {
  isValidEmail,
  isStrongPassword,
} from "../utils/validators";

export default function Register() {
  // FIRST + LAST NAME
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Email validation
    if (!isValidEmail(email)) {
      alert("Please enter a valid email");
      return;
    }

    // Password validation
    if (!isStrongPassword(password)) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      // combine first + last name
      const fullName = `${firstName} ${lastName}`;

      const res = await API.post("/auth/register", {
        name: fullName,
        email,
        password,
      });

      // save token
      localStorage.setItem("token", res.data.token);

      alert("Account created successfully!");

      navigate("/dashboard");

    } catch (error) {
      console.error("Register error:", error);

      alert(
        error?.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
      
      <form
        onSubmit={handleRegister}
        className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md shadow-lg space-y-5"
      >
        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-zinc-400 text-center text-sm">
          Join MasonDev and start networking
        </p>

        {/* FIRST NAME */}
        <input
          type="text"
          placeholder="First name"
          className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-white"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        {/* LAST NAME */}
        <input
          type="text"
          placeholder="Last name"
          className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-white"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-zinc-300 transition"
        >
          Create Account
        </button>

        {/* REDIRECT */}
        <p className="text-center text-zinc-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}