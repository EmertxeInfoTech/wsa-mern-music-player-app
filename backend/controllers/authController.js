import axios from "axios";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1d";

const createToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json;
    ({ message: "Name,email and password are required" });
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User with this email already exists" });
  }

  const user = await User.create({ name, email, password });

  const token = createToken(user._id);

  res.status(200).json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json;
    ({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = createToken(user._id);

  res.status(200).json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
};

const getMe = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });

  res.json({
    user: { id: req.user._id, name: req.user.name, email: req.user.email },
  });
};

export { signUp, login, getMe };
