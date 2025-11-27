import React from "react";
import "../css/Playlist.css";
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
      id: 4,
      tag: "relaxing",
      label: "Relaxing",
      img: "https://media.istockphoto.com/id/636342222/photo/man-running-outdoors.jpg?s=612x612&w=0&k=20&c=i-igbJRtN_-xux2ErLQMNUBQ9ekRsMxTymv_5TlVJgU=",
    },
  ];
  return (
    <div className="playlist-section">
      <h1 className="playlist-title">Your Playlists</h1>
      <div className="playlist-carousel-wrapper">
        {/* <button className="carousel-btn">◀</button> */}
        <div className="playlist-carousel">
          {items.map((item) => (
            <div
              className="playlist-card"
              key={item.id}
              onClick={() => onSelectTag && onSelectTag(item.tag)}
            >
              <img src={item.img} alt="" />
              <h4 className="playlist-name">{item.label}</h4>
            </div>
          ))}
        </div>
        {/* <button className="carousel-btn">▶</button> */}
      </div>
    </div>
  );
};

export default Playlist;
