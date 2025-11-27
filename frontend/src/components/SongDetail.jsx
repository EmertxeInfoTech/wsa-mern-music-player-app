import React from "react";
import "../css/SongDetail.css";
const SongDetail = () => {
  const fallback = {
    album_name: "petta",
    artist_name: "Anirudh",
    album_image:
      "https://usercontent.jamendo.com?type=album&id=24&width=300&trackid=168",
  };

  const data = fallback;
  return (
    <>
      <div className="songdetail-wrapper">
        <div className="songdetail-image">
          <img src={data.album_image} alt="image" loading="lazy" />
        </div>
        <div className="songdetail-text">
          <h3 className="songdetail-title">{data.album_name}</h3>
          <p className="songdetail-artist">{data.artist_name}</p>
        </div>
      </div>
    </>
  );
};

export default SongDetail;
