import axios from "axios";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import imagekit from "../config/imagekit.js";
import { useRef } from "react";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1d";

const createToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const signUp = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

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

    let avatarUrl = "";

    if (avatar) {
      const uploadResponse = await imagekit.upload({
        file: avatar,
        fileName: `avatar_${Date.now()}.jpg`,
        folder: "/mern-music-player",
      });

      avatarUrl = uploadResponse.url;
    }
    const user = await User.create({
      name,
      email,
      password,
      avatar: avatarUrl,
    });

    const token = createToken(user._id);

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed.Please try again" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
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
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        favourites: user.favourites,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed.Please try again" });
  }
};

const editProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const { name, email, avatar, currentPassword, newPassword } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          message: "Both current and new password are required",
        });
      }
      const isMatch = await user.comparePassword(currentPassword);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }

      user.password = newPassword;
    }

    if (avatar) {
      const uploadResponse = await imagekit.upload({
        file: avatar,
        fileName: `avatar_${userId}_${Date.now()}.jpg`,
        folder: "/mern-music-player",
      });
      user.avatar = uploadResponse.url;
    }

    await user.save();
    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      message: "Profile updated successfully!",
    });
  } catch (error) {
    console.log("Edit profile error", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};
const getMe = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });

  res.json(req.user);
};

export { signUp, login, editProfile, getMe };
