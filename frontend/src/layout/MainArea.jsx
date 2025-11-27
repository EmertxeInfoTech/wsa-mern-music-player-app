import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../components/Auth";
import Playlist from "../components/Playlist";
import SongList from "../components/SongList";
import "../css/MainArea.css";

const MainArea = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchInitialSongs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/songs");
        setSongs(res.data.results || []);
      } catch (error) {
        console.error("Error while fetching songs:", error);
        setSongs([]);
      }
    };

    fetchInitialSongs();
  }, []);

  const loadPlaylist = async (tag) => {
    if (!tag) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/songs/playlistByTag/${tag}`
      );

      setSongs(res.data.results || []);
    } catch (error) {
      console.error("Failed to load playlist:", error);
      setSongs([]);
    }
  };
  return (
    <div className="mainarea">
      <Auth />
      <Playlist onSelectTag={loadPlaylist} />
      <SongList songs={songs} />
    </div>
  );
};

export default MainArea;
