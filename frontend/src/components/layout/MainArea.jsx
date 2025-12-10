import React from "react";
import Auth from "../auth/Auth";
import Playlist from "../player/Playlist";
import SongList from "../player/SongList";
import "../../css/mainArea/MainArea.css";

const MainArea = ({ songs, onSelectSong, currentIndex, onSelectTag }) => {
  return (
    <div className="mainarea-root">
      <Auth />
      <Playlist onSelectTag={onSelectTag} />
      <SongList
        songs={songs}
        onSelectSong={onSelectSong}
        currentIndex={currentIndex}
      />
    </div>
  );
};

export default MainArea;
