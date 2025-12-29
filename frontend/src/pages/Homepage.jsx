import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import Footer from "../components/layout/Footer";
import SideMenu from "../components/layout/SideMenu";
import MainArea from "../components/layout/MainArea";
import Modal from "../components/common/Modal";
import EditProfile from "../components/auth/EditProfile";
import useAudioPlayer from "../hooks/useAudioPlayer";
import "../css/pages/HomePage.css";

const API_URL = import.meta.env.VITE_API_URL;
const Homepage = () => {
  /**
   * STATE ORGANIZATION:
   * - songs/searchSongs: Local state (changes frequently based on user actions)
   * - favourites: Redux state (part of user profile, needs to persist)
   * - auth: Redux state (global - needed across multiple components)
   */
  const [songs, setSongs] = useState([]);
  const [searchSongs, setSearchSongs] = useState([]);

  /**
   * UI STATE PATTERN:
   * - EditProfile modal: Local state (only opened from SideMenu)
   * - Login modal: Redux state (can be opened from multiple components)
   */
  const [openEditProfile, setOpenEditProfile] = useState(false);

  const auth = useSelector((state) => state.auth);

  const [view, setView] = useState("home");

  const songsToDisplay = view === "search" ? searchSongs : songs;

  const {
    audioRef,
    currentIndex,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    isMuted,
    loopEnabled,
    shuffleEnabled,
    playbackSpeed,
    volume,
    playSongAtIndex,
    handleTogglePlay,
    handleNext,
    handlePrev,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
    handleToggleMute,
    handleToggleLoop,
    handleToggleShuffle,
    handleChangeSpeed,
    handleSeek,
    handleChangeVolume,
  } = useAudioPlayer(songsToDisplay);

  const playerState = {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    isMuted,
    loopEnabled,
    shuffleEnabled,
    playbackSpeed,
    volume,
  };

  const playerControls = {
    playSongAtIndex,
    handleTogglePlay,
    handleNext,
    handlePrev,
    handleSeek,
  };

  const playerFeatures = {
    onToggleMute: handleToggleMute,
    onToggleLoop: handleToggleLoop,
    onToggleShuffle: handleToggleShuffle,
    onChangeSpeed: handleChangeSpeed,
    onChangeVolume: handleChangeVolume,
  };
  useEffect(() => {
    const fetchInitialSongs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/songs`);
        setSongs(res.data.results || []);
      } catch (error) {
        console.error("Error while fetching songs:", error);
        setSongs([]);
      }
    };

    fetchInitialSongs();
  }, []);

  const loadPlaylist = async (tag) => {
    if (!tag) {
      console.warn("No tag provided");
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/api/songs/playlistByTag/${tag}`);

      setSongs(res.data.results || []);
    } catch (error) {
      console.error("Failed to load playlist:", error);
      setSongs([]);
    }
  };

  // when user clicks a song in the table
  const handleSelectSong = (index) => {
    playSongAtIndex(index);
  };
  const handlePlayFavourite = (song) => {
    const favourites = auth.user?.favourites || [];
    if (!favourites.length) return;

    const index = auth.user.favourites.findIndex((fav) => fav.id === song.id);
    setSongs(auth.user.favourites);
    setView("home");

    setTimeout(() => {
      if (index !== -1) {
        playSongAtIndex(index);
      }
    }, 0);
  };

  return (
    <div className="homepage-root">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      >
        {currentSong && <source src={currentSong.audio} type="audio/mpeg" />}
      </audio>

      <div className="homepage-main-wrapper">
        <div className="homepage-sidebar">
          <SideMenu
            setView={setView}
            view={view}
            onOpenEditProfile={() => setOpenEditProfile(true)}
          />
        </div>
        {/* Rightside */}
        <div className="homepage-content">
          <MainArea
            currentIndex={currentIndex}
            onSelectSong={handleSelectSong}
            onSelectFavourite={handlePlayFavourite}
            onSelectTag={loadPlaylist}
            view={view}
            songsToDisplay={songsToDisplay}
            setSearchSongs={setSearchSongs}
          />
        </div>
      </div>
      <Footer
        playerState={playerState}
        playerControls={playerControls}
        playerFeatures={playerFeatures}
      />
      {openEditProfile && (
        <Modal onClose={() => setOpenEditProfile(false)}>
          <EditProfile onClose={() => setOpenEditProfile(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Homepage;
