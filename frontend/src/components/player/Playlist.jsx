import React from "react";
import "../../css/mainArea/Playlist.css";
const Playlist = ({ onSelectTag }) => {
  const items = [
    {
      id: 1,
      tag: "workout",
      label: "Workout",
      img: "https://media.istockphoto.com/id/904837138/vector/folded-white-paper-heart-icon-with-shadow-on-red-background-minimal-flat-red-love-symbol.jpg?s=170667a&w=0&k=20&c=CmncVqn5htsD8x6ENBt2bLnhyUluMJuD8VpZbPEwHWE=",
    },
    {
      id: 2,
      tag: "chill",
      label: "Chill",
      img: "https://media.istockphoto.com/id/1073941846/vector/3d-sound-waves-with-colored-dots-big-data-abstract-visualization.jpg?s=612x612&w=0&k=20&c=duxGn_eTDtlYqKyLvv0OAHibwv0dA5xRU3TGQEgGjwQ=",
    },
    {
      id: 3,
      tag: "happy",
      label: "Happy",
      img: "https://thumbs.dreamstime.com/b/cassette-tape-eighties-inspired-retro-colors-vintage-music-theme-blended-modern-art-deep-space-elements-featuring-mix-414923588.jpg",
    },
    {
      id: 4,
      tag: "relaxing",
      label: "Relaxing",
      img: "https://media.istockphoto.com/id/636342222/photo/man-running-outdoors.jpg?s=612x612&w=0&k=20&c=i-igbJRtN_-xux2ErLQMNUBQ9ekRsMxTymv_5TlVJgU=",
    },
    {
      id: 5,
      tag: "relaxing",
      label: "Relaxing",
      img: "https://media.istockphoto.com/id/636342222/photo/man-running-outdoors.jpg?s=612x612&w=0&k=20&c=i-igbJRtN_-xux2ErLQMNUBQ9ekRsMxTymv_5TlVJgU=",
    },
  ];
  return (
    <div className="playlist-root">
      <h1 className="playlist-title">Your Playlists</h1>
      <div className="playlist-wrapper">
        <div className="playlist-grid">
          {items.map((item) => (
            <div
              className="playlist-card"
              key={item.id}
              onClick={() => onSelectTag && onSelectTag(item.tag)}
            >
              <img src={item.img} alt="" className="playlist-image" />
              <h4 className="playlist-label">{item.label}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
