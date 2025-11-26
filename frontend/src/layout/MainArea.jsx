import React from "react";
import Auth from "../components/Auth";
import Playlist from "../components/Playlist";
import SongList from "../components/SongList";

const MainArea = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "auto",
        paddingRight: "10px",
      }}
    >
      <Auth />
      <Playlist />
      <SongList />
    </div>
  );
};

export default MainArea;
