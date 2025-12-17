import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import Footer from "../components/layout/Footer";
import SideMenu from "../components/layout/SideMenu";
import MainArea from "../components/layout/MainArea";
import useAudioPlayer from "../hooks/useAudioPlayer";
import "../css/HomePage.css";

const Homepage = () => {
  // controlarea
  const [songs, setSongs] = useState([]);
  const [searchSongs, setSearchSongs] = useState([]);
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

  // when user clicks a song in the table
  const handleSelectSong = (index) => {
    playSongAtIndex(index);
  };
  const handlePlayFavourite = (song) => {
    // Step 1: set favourites as active playlist
    setSongs(auth.user.favourites);

    // Step 2: find index of clicked song
    const index = auth.user.favourites.findIndex(
      (fav) => fav.songId === song.songId
    );

    // Step 3: switch view (optional but recommended)
    setView("home");

    // Step 4: play song
    if (index !== -1) {
      playSongAtIndex(index);
    }
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
          <SideMenu setView={setView} view={view} />
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
    </div>
  );
};

export default Homepage;
