import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="px-6 py-8">
        {children}
      </main>
    </div>
  );
}