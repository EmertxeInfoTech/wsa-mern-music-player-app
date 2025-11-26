import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import MainArea from "./MainArea";

const Homepage = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    const fetchsongs = async () => {
      try {
        console.log("hi");
        const res = await axios.get("http://localhost:5000/api/getallsongs");
        // console.log(res.data);
        // console.log(res.data.results);
        setSongs(res.data.results);
      } catch (error) {
        console.error("Error while fetching songs:", error);
      }
    };

    fetchsongs();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        margin: "1px",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: "1",
          border: "1px solid black",
          minHeight: 0,
        }}
      >
        <div
          style={{
            width: "30%",
            borderRight: "1px solid #ddd",
            padding: "10px",
          }}
        >
          <SideMenu />
        </div>
        {/* Rightside */}
        <div
          style={{
            width: "70%",
            borderRight: "1px solid #ddd",
            padding: "16px",
            overflow: "hidden",
            backgroundColor: "wheat",
          }}
        >
          <MainArea />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
