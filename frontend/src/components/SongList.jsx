import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/SongList.css";
const SongList = ({ songs = [] }) => {
  return (
    <div className="songlist-container">
      <table className="songlist-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Artist</th>
            <th>Year</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
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
