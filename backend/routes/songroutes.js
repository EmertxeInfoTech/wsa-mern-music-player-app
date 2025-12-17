import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getSongs,
  getPlaylistByTag,
  toggleFavourite,
} from "../controllers/songController.js";
const router = express.Router();

router.get("/", getSongs);
router.get("/playlistByTag/:tag", getPlaylistByTag);
router.post("/favourite", protect, toggleFavourite);
router.get("/favourites", protect, (req, res) => {
  res.json(req.user.favourites);
});
export default router;
