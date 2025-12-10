import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Footer from "../components/layout/Footer";
import SideMenu from "../components/layout/SideMenu";
import MainArea from "../components/layout/MainArea";
import useAudioPlayer from "../hooks/useAudioPlayer";
import "../css/HomePage.css";

const Homepage = () => {
  // controlarea
  const [songs, setSongs] = useState([]);
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
  } = useAudioPlayer(songs);

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
          <SideMenu />
        </div>
        {/* Rightside */}
        <div className="homepage-content">
          <MainArea
            songs={songs}
            currentIndex={currentIndex}
            onSelectSong={handleSelectSong}
            onSelectTag={loadPlaylist}
          />
        </div>
      </div>
      <Footer
        //current song state
        currentSong={currentSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onTogglePlay={handleTogglePlay}
        // next/prev
        onNext={handleNext}
        onPrev={handlePrev}
        // Mute Props
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        // Loop props
        loopEnabled={loopEnabled}
        onToggleLoop={handleToggleLoop}
        // Shuffle
        shuffleEnabled={shuffleEnabled}
        onToggleShuffle={handleToggleShuffle}
        // speed
        playbackSpeed={playbackSpeed}
        onChangeSpeed={handleChangeSpeed}
        // seek
        onSeek={handleSeek}
        // volume
        volume={volume}
        onChangeVolume={handleChangeVolume}
      />
    </div>
  );
};

export default Homepage;
