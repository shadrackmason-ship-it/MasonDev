import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const [time, setTime] = useState(new Date());

  // live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-24 px-6 text-center">

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-4">
          Welcome to your Dashboard
        </h1>

        {/* AUTH STATUS */}
        <p className="text-zinc-400">
          {token ? "You are logged in" : "Not logged in"}
        </p>

        {/* USER INFO (REAL FROM BACKEND) */}
        <p className="text-zinc-300 mt-3 text-lg">
          {user?.email || "Loading user..."}
        </p>

        {/* LIVE CLOCK */}
        <div className="mt-8">
          <p className="text-2xl font-semibold">
            {time.toLocaleTimeString()}
          </p>

          <p className="text-zinc-500">
            {time.toLocaleDateString()}
          </p>
        </div>

      </div>
    </div>
  );
}