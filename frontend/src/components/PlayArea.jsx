import React, { useEffect, useRef, useState } from "react";

const PlayArea = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioUrl = song ? song.audio || song.audiodownload || null : null;

  useEffect(() => {
    if (!audioRef.current) return;

    if (audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(true);
      }
    } else {
      audioRef.current.pause();
      audioRef.current.src = "";
      setIsPlaying(false);
    }
  }, [audioUrl]);
  //

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  if (!song) return <div>Select a song on the left to play</div>;
  return (
    <div style={{ width: "100%", maxWidth: 720 }}>
      <h3 style={{ marginBottom: 8 }}>{song.name}</h3>
      <p style={{ marginTop: 0, marginBottom: 16 }}>{song.artist_name}</p>

      <div>
        <button onClick={togglePlay}>{isPlaying ? "pause" : "play"}</button>
      </div>

      <audio ref={audioRef}></audio>
    </div>
  );
};

export default PlayArea;
