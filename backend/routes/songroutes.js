import express from "express";
import { getSongs, getPlaylistByTag } from "../controllers/songController.js";
const router = express.Router();

router.get("/", getSongs);
router.get("/playlistByTag/:tag", getPlaylistByTag);

export default router;
