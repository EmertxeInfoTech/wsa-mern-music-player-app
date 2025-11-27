import React from "react";
import { IoIosSettings } from "react-icons/io";
import "../css/SideMenu.css";
const SideMenu = ({ active = "Home" }) => {
  const displayUser = { name: "Guest", avatar: "" };
  return (
    <aside aria-label="Sidebar menu" className="sidemenu">
      <div className="sidemenu-top">
        {/* Music Player Name */}
        <div className="sidemenu-logo" aria-hidden />
        <h2 className="sidemenu-title">Synthesia</h2>
      </div>

      <nav className="sidemenu-nav" aria-label="Main navigation">
        <ul>
          <li>
            <button type="button" className={active === "Home" ? "active" : ""}>
              Home
            </button>
          </li>
          <li>
            <button
              type="button"
              className={active === "Search" ? "active" : ""}
            >
              {" "}
              Search
            </button>
          </li>
          <li>
            <button
              type="button"
              className={active === "Favourites" ? "active" : ""}
            >
              My Favourite
            </button>
          </li>
        </ul>
      </nav>
      <div className="sidemenu-spacer" />
      <div className="sidemenu-profile">
        {/*  user profile */}
        <img
          src={displayUser.avatar || "https://via.placeholder.com/48?text=U"}
          alt=""
          loading="lazy"
          className="sidemenu-avatar"
        />
        {/* username */}
        <div style={{ flex: 1 }}>
          <div className="sidemenu-username">{displayUser.name || "Guest"}</div>
        </div>
        <button
          type="button"
          aria-label="User settings"
          className="sidemenu-settings"
        >
          <IoIosSettings size={20} />
        </button>
      </div>
    </aside>
  );
};

export default SideMenu;

{
  /* leftside */
}
{
  /* <div
          style={{
            width: "35%",
            borderRight: "1px solid #ddd",
            padding: "10px",
            overflowY: "scroll",
          }}
        >
          <h2>Songs</h2>
          {songs.length === 0 ? (
            <p>Loading Songs...</p>
          ) : (
            songs.map((song) => (
              <div
                key={song.id}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  background:
                    selectedSong && selectedSong.id === song.id
                      ? "#f0f8ff"
                      : "white",
                }}
                onClick={() => setSelectedSong(song)}
              >
                <p>{song.name}</p>
                <p>{song.artist_name}</p>
              </div>
            ))
          )}
        </div> */
}
