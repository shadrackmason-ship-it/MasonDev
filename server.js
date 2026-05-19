import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"; //  ADDED
import User from "./models/User.js"; // needed for reset route

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// =========================
// ROUTES
// =========================

// Auth routes
app.use("/api/auth", authRoutes);

//  User/profile routes ADDED HERE
app.use("/api/users", userRoutes);

// =========================
// TEST ROUTE
// =========================
app.get("/", (req, res) => {
  res.json({ message: "MasonDev API running 🚀" });
});

// =========================
// TEMP DEBUG ROUTE
// =========================
app.delete("/api/debug/reset-users", async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =========================
// DATABASE CONNECTION
// =========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

// error logging
server.on("error", (err) => {
  console.error("SERVER ERROR:", err);
});