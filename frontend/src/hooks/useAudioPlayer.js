import { useState, useEffect, useRef } from "react";

const useAudioPlayer = (songs) => {
  // Current song state
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  //Features state
  const [isMuted, setIsMuted] = useState(false);
  const [loopEnabled, setLoopEnabled] = useState(false);
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);

  const audioRef = useRef(null);

  //Play song at specific index
  const playSongAtIndex = (index) => {
    if (!songs.length) return;

    if (index < 0 || index >= songs.length) return;

    const song = songs[index];
    setCurrentIndex(index);
    setCurrentSong(song);
    setCurrentTime(0);

    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    audio.playbackRate = playbackSpeed;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((e) => console.error("Play error:", e));
  };

  // Toggle play/pause
  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.error("Play error:", e));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Next Song
  const handleNext = () => {
    //marking
    if (!songs.length) return;

    // marking
    if (currentIndex === null) {
      playSongAtIndex(0);
      return;
    }

    //If shuffle Enabled
    if (shuffleEnabled && songs.length > 1) {
      let randomIndex = currentIndex;
      while (randomIndex === currentIndex) {
        randomIndex = Math.floor(Math.random() * songs.length);
      }
      playSongAtIndex(randomIndex);
      return;
    }

    // Next without shuffle
    const nextIndex = (currentIndex + 1) % songs.length;
    playSongAtIndex(nextIndex);
  };

  // Previous Song
  const handlePrev = () => {
    if (!songs.length) return;

    if (currentIndex === null) {
      playsongAtIndex(0);
      return;
    }
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSongAtIndex(prevIndex);
  };

  // Audio event handlers
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime || 0); //marking
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration || 0);
    audio.playbackRate = playbackSpeed;
    audio.volume = volume;
    audio.isMuted = isMuted;
  };

  // Last Song
  const handleEnded = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (loopEnabled) {
      audio.currentTime = 0;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setCurrentTime(0);
        })
        .catch((e) => console.error("RePlay error:", e));
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
      handleNext();
    }
  };

  const handleToggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
      setVolume(previousVolume);
      audio.volume = previousVolume;
    } else {
      audio.muted = true;
      setIsMuted(true);
      setVolume(0);
      audio.volume = 0;
    }
  };

  const handleToggleLoop = () => {
    setLoopEnabled((prev) => !prev);
  };

  const handleToggleShuffle = () => {
    setShuffleEnabled((prev) => !prev);
  };

  const handleChangeSpeed = (newSpeed) => {
    const audio = audioRef.current;
    setPlaybackSpeed(newSpeed);
    if (audio) {
      audio.playbackRate = newSpeed;
    }
  };

  const handleSeek = (newTime) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleChangeVolume = (newVolume) => {
    const audio = audioRef.current;
    setVolume(newVolume);

    if (audio) {
      audio.volume = newVolume;
      if (newVolume === 0) {
        audio.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        audio.muted = false;
        setIsMuted(false);
      }
    }
  };

  return {
    // Audio ref
    audioRef,

    // Current song state
    currentIndex,
    currentSong,
    isPlaying,
    currentTime,
    duration,

    // Features state
    isMuted,
    loopEnabled,
    shuffleEnabled,
    playbackSpeed,
    volume,

    // Playback handlers
    playSongAtIndex,
    handleTogglePlay,
    handleNext,
    handlePrev,

    // Audio event handlers
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,

    // Feature handlers
    handleToggleMute,
    handleToggleLoop,
    handleToggleShuffle,
    handleChangeSpeed,
    handleSeek,
    handleChangeVolume,
  };
};
export default useAudioPlayer;
