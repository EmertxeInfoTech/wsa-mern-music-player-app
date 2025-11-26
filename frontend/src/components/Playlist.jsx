import React from "react";

const Playlist = () => {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h1>Your Playlists</h1>
      <div
        style={{
          display: "flex",
          marginTop: "12px",
          overflowX: "auto",
          paddingBottom: "8px",
          gap: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://media.istockphoto.com/id/904837138/vector/folded-white-paper-heart-icon-with-shadow-on-red-background-minimal-flat-red-love-symbol.jpg?s=170667a&w=0&k=20&c=CmncVqn5htsD8x6ENBt2bLnhyUluMJuD8VpZbPEwHWE="
            alt=""
            width={80}
            height={80}
          />
          <h4>Liked Songs</h4>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://media.istockphoto.com/id/1073941846/vector/3d-sound-waves-with-colored-dots-big-data-abstract-visualization.jpg?s=612x612&w=0&k=20&c=duxGn_eTDtlYqKyLvv0OAHibwv0dA5xRU3TGQEgGjwQ="
            alt=""
            width={80}
            height={80}
          />
          <h4>Chille</h4>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://thumbs.dreamstime.com/b/cassette-tape-eighties-inspired-retro-colors-vintage-music-theme-blended-modern-art-deep-space-elements-featuring-mix-414923588.jpg"
            alt=""
            width={80}
            height={80}
          />
          <h4>Chill Vibes</h4>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://media.istockphoto.com/id/636342222/photo/man-running-outdoors.jpg?s=612x612&w=0&k=20&c=i-igbJRtN_-xux2ErLQMNUBQ9ekRsMxTymv_5TlVJgU="
            alt=""
            width={80}
            height={80}
          />
          <h4>Road Trip James</h4>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
