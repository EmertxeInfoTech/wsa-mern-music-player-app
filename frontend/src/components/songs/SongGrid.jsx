import React from "react";
import SongCard from "./SongCard";
import "../../css/songs/SongGrid.css";
const SongGrid = ({ songs, onSongSelect }) => {
  if (!songs.length) {
    return <p className="empty-text">No songs Found</p>;
  }

  return (
    <div className="song-grid-wrapper">
      <h2 className="song-grid-heading">Your Favourites</h2>
      <div className="song-grid">
        {songs.map((song) => (
          <SongCard
            key={song.songId || song.id}
            song={song}
            onClick={() => onSongSelect(song)}
          />
        ))}
      </div>
    </div>
  );
};

export default SongGrid;
