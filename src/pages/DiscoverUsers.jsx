import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function DiscoverUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectingId, setConnectingId] = useState(null);

  // =========================
  // FETCH USERS
  // =========================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // =========================
  // CONNECT USER
  // =========================
  const handleConnect = async (id) => {
    try {
      setConnectingId(id);

      await API.post(`/users/connect/${id}`);

      // remove connected user from list (simple UX)
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Connect error:", err);
      alert(err?.response?.data?.message || "Connection failed");
    } finally {
      setConnectingId(null);
    }
  };

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading developers...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">
          Discover Developers 👀
        </h1>

        {/* USERS LIST */}
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-zinc-900 p-5 rounded-xl flex justify-between items-center"
            >
              {/* LEFT SIDE */}
              <div>
                <h2 className="text-xl font-semibold">
                  {user.name}
                </h2>

                <p className="text-zinc-400 text-sm">
                  {user.bio || "No bio yet"}
                </p>

                <p className="text-zinc-500 text-sm mt-1">
                  {user.university || "No university"} •{" "}
                  {user.location || "No location"}
                </p>

                {/* SKILLS */}
                {user.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs bg-zinc-800 px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT SIDE */}
              <button
                onClick={() => handleConnect(user._id)}
                disabled={connectingId === user._id}
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-zinc-300 transition disabled:opacity-50"
              >
                {connectingId === user._id
                  ? "Connecting..."
                  : "Connect"}
              </button>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {users.length === 0 && (
          <p className="text-zinc-500 mt-10 text-center">
            No developers found.
          </p>
        )}
      </div>
    </div>
  );
}