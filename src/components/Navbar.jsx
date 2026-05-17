import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      
      <Link to="/" className="text-2xl font-bold">
        MasonDev
      </Link>

      <div className="space-x-4 flex items-center">

        <Link to="/">Home</Link>

        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>

            <button
              onClick={handleLogout}
              className="bg-white text-black px-3 py-1 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}