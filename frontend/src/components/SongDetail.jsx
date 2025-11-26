import React from "react";

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
      <div
        style={{
          display: "flex",
          width: "32%",
          gap: 12,
          //   backgroundColor: "Red",
          alignItems: "center",
        }}
      >
        <div style={{ padding: "6px" }}>
          <img
            src={data.album_image}
            alt="image"
            width={70}
            height={70}
            loading="lazy"
            style={{ borderRadius: 6, objectFit: "cover" }}
          />
        </div>
        <div style={{ padding: "6px" }}>
          <h3
            style={{
              margin: 0,
              fontSize: 16,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {data.album_name}
          </h3>
          <p style={{ margin: 0, fontSize: 18, color: "#9ca3af" }}>
            {data.artist_name}
          </p>
        </div>
      </div>
    </>
  );
};

export default SongDetail;
