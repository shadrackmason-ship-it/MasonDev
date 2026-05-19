import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-40 text-center px-6">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to MasonDev
        </h1>

        <p className="text-zinc-400 max-w-2xl text-lg">
          Smart networking platform for students and developers.
        </p>

        <Link
          to="/register"
          className="mt-8 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}