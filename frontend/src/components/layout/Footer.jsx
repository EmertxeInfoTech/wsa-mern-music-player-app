import React from "react";
import SongDetail from "../player/SongDetail";
import ControlArea from "../player/ControlArea";
import Features from "../player/Features";
import "../../css/footer/Footer.css";
const Footer = ({
  // songdetail
  currentSong,
  duration,
  // play/pause
  isPlaying,
  currentTime,
  onTogglePlay,
  // next/prev
  onNext,
  onPrev,
  // mute
  isMuted,
  onToggleMute,
  // loop
  loopEnabled,
  handleToggleLoop,
  // shuffle
  shuffleEnabled,
  onToggleShuffle,
  // speed
  playbackSpeed,
  onChangeSpeed,
  // seek
  onSeek,
  // volume
  volume,
  onChangeVolume,
}) => {
  return (
    <footer className="footer-root">
      <SongDetail currentSong={currentSong} />
      <ControlArea
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onTogglePlay={onTogglePlay}
        onNext={onNext}
        onPrev={onPrev}
        onSeek={onSeek}
      />
      <Features
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        loopEnabled={loopEnabled}
        onToggleLoop={handleToggleLoop}
        shuffleEnabled={shuffleEnabled}
        onToggleShuffle={onToggleShuffle}
        playbackSpeed={playbackSpeed}
        onChangeSpeed={onChangeSpeed}
        volume={volume}
        onChangeVolume={onChangeVolume}
      />
    </footer>
  );
};

export default Footer;
