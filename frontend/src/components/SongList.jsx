import React from "react";

const SongList = () => {
  const list = [
    {
      name: "J'm'e FPM",
      duration: 183,
      artist_name: "TriFace",
      releasedate: "2004-12-17",
    },
    {
      name: "Trio HxC",
      duration: 101,
      artist_name: "TriFace",
      releasedate: "2004-12-17",
    },
    {
      name: "Un Poil De Relifion",
      duration: 207,
      artist_name: "TriFace",
      releasedate: "2004-12-17",
    },
    {
      name: "Apologies",
      duration: 145,
      artist_name: "TriFace",
      releasedate: "2004-12-17",
    },
    {
      name: "Je Vomis Comme Je Chante",
      duration: 177,
      artist_name: "TriFace",
      releasedate: "2004-12-17",
    },
  ];
  return (
    <div style={{ marginTop: "24px", overflowX: "auto", width: "100%" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ padding: "8px 4px", textAlign: "left" }}>
            <th>No</th>
            <th>Name</th>
            <th>Artist</th>
            <th>Year</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {list.map((song, index) => (
            <tr key={index}>
              <td style={{ padding: "8px 4px", textAlign: "left" }}>
                {index + 1}
              </td>
              <td>{song.name}</td>
              <td>{song.artist_name}</td>
              <td>{song.releasedate}</td>
              <td>{song.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongList;
