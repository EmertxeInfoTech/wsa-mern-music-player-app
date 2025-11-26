import React from "react";
import { IoIosSettings } from "react-icons/io";
const SideMenu = () => {
  const displayUser = { name: "Guest", avatar: "" };
  return (
    <aside
      aria-label="Sidebar menu"
      style={{
        width: "260px",
        padding: 16,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Music Player Name */}
        <div
          aria-hidden
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "red",
            display: "inline-block",
          }}
        />
        <h2 style={{ margin: 0, fontSize: 18 }}>Synthesia</h2>
      </div>

      <nav style={{ flex: "0 0 auto", marginTop: 12 }}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <li>
            <button
              type="button"
              style={{
                background: "transparent",
                border: "none",
                padding: 8,
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
              }}
            >
              Home
            </button>
          </li>
          <li>
            <button
              type="button"
              style={{
                background: "transparent",
                border: "none",
                padding: 8,
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
              }}
            >
              {" "}
              Search
            </button>
          </li>
          <li>
            <button
              type="button"
              style={{
                background: "transparent",
                border: "none",
                padding: 8,
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
              }}
            >
              My Favourite
            </button>
          </li>
        </ul>
      </nav>
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/*  user profile */}
        <img
          src={displayUser.avatar || "https://via.placeholder.com/48?text=U"}
          alt=""
          width={48}
          height={48}
          loading="lazy"
          style={{ borderRadius: 8, objectFit: "cover" }}
        />
        {/* username */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>
            {displayUser.name || "Guest"}
          </div>
        </div>
        <button
          type="button"
          aria-label="User settings"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 6,
          }}
        >
          <IoIosSettings size={20} color="#000" />
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
