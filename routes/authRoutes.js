import express from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

/**
 * AUTH ROUTES
 * Base: /api/auth
 */

// Register new user
router.post("/register", registerUser);

// Login existing user
router.post("/login", loginUser);

export default router;