import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Lax",
  maxAge: 30 * 24 * 60 * 60 * 1000,
  path: "/",
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Provide all the fields correctly" });
    }

    const exist = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING users_id, name, email",
      [name, email, hashedPassword],
    );

    const token = generateToken(newUser.rows[0].users_id);

    res.cookie("token", token, cookieOptions);

    return res.status(201).json({ message: "User was created successfully", user: newUser.rows[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (!user.rows.length === 0) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const userData = user.rows[0];

  const isMatch = await bcrypt.compare(password, userData.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user.rows[0].users_id);

  res.cookie("token", token, cookieOptions);

  res.json({
    user: {
      id: userData.id,
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
    },
  });
});

router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

router.post("/logout", (_, res) => {
  res.clearCookie("token", cookieOptions);
  res.json({ message: "Logged out succesfully" });
});

export default router;
