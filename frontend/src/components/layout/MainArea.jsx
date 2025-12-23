import React from "react";
import Auth from "../auth/Auth";
import Playlist from "../player/Playlist";
import SearchBar from "../search/SearchBar";
import SongList from "../player/SongList";

import { useSelector } from "react-redux";
import SongGrid from "../songs/SongGrid";
import "../../css/mainArea/mainArea.css";

const MainArea = ({
  view,
  songsToDisplay,
  onSelectSong,
  onSelectFavourite,
  currentIndex,
  onSelectTag,
  setSearchSongs,
}) => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="mainarea-root">
      <div className="mainarea-top">
        <Auth />
        {view === "home" && <Playlist onSelectTag={onSelectTag} />}
        {view === "search" && <SearchBar setSearchSongs={setSearchSongs} />}
      </div>
      <div className="mainarea-scroll">
        {(view === "search" || view === "home") && (
          <SongList
            songs={songsToDisplay}
            onSelectSong={onSelectSong}
            currentIndex={currentIndex}
          />
        )}
        {view === "favourite" && (
          <SongGrid
            songs={auth.user?.favourites || []}
            onSelectFavourite={onSelectFavourite}
          />
        )}
      </div>
    </div>
  );
};

export default MainArea;
