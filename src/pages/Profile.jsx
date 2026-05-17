import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await API.get("/users/me");

        setProfile(res.data);
      } catch (error) {
        console.error("Profile load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  // not logged in
  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Not logged in
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-24 px-6 text-center">

        {/* NAME */}
        <h1 className="text-4xl font-bold mb-2">
          {profile.name}
        </h1>

        {/* EMAIL */}
        <p className="text-zinc-400">
          {profile.email}
        </p>

        {/* BIO */}
        <p className="text-zinc-400 mt-4 max-w-xl">
          {profile.bio || "No bio yet"}
        </p>

        {/* UNIVERSITY */}
        <p className="text-zinc-500 mt-2">
          {profile.university || "No university added"}
        </p>

        {/* LOCATION */}
        <p className="text-zinc-500">
          {profile.location || "No location added"}
        </p>

        {/* SKILLS */}
        <p className="text-zinc-300 mt-4">
          Skills: {profile.skills?.length
            ? profile.skills.join(", ")
            : "No skills yet"}
        </p>

        {/* GITHUB */}
        <p className="text-zinc-400 mt-2">
          GitHub: {profile.github || "Not added"}
        </p>

        {/* PORTFOLIO */}
        <p className="text-zinc-400">
          Portfolio: {profile.portfolio || "Not added"}
        </p>

        {/* EDIT BUTTON */}
        <Link
          to="/profile/edit"
          className="mt-6 bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-zinc-300 transition"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}