import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    university: "",
    location: "",
    github: "",
    portfolio: "",
    skills: "",
    techStack: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/me");

        setFormData({
          name: res.data.name || "",
          bio: res.data.bio || "",
          university: res.data.university || "",
          location: res.data.location || "",
          github: res.data.github || "",
          portfolio: res.data.portfolio || "",
          skills: res.data.skills?.join(", ") || "",
          techStack:
            res.data.techStack?.join(", ") || "",
        });

      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put("/users/profile", {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim()),

        techStack: formData.techStack
          .split(",")
          .map((s) => s.trim()),
      });

      alert("Profile updated!");

      navigate("/profile");

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl w-full max-w-2xl space-y-4"
      >
        <h1 className="text-3xl font-bold">
          Edit Profile
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="text"
          name="university"
          placeholder="University"
          value={formData.university}
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="text"
          name="github"
          placeholder="GitHub Link"
          value={formData.github}
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="text"
          name="portfolio"
          placeholder="Portfolio Link"
          value={formData.portfolio}
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (comma separated)"
          value={formData.techStack}
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <button
          type="submit"
          className="bg-white text-black px-6 py-3 rounded-lg font-bold"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}