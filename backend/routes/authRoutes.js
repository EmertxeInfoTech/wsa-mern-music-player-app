import express from "express";
import {
  signUp,
  login,
  getMe,
  editProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/profile", protect, editProfile);

export default router;
