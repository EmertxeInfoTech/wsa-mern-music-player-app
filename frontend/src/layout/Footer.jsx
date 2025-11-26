import React from "react";
import SongDetail from "../components/SongDetail";
import ControlArea from "../components/ControlArea";
import Features from "../components/Features";
const Footer = () => {
  return (
    <footer
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#000",
        color: "#fff",
        padding: "8px 16px",
        boxSizing: "border-box",
      }}
    >
      <SongDetail />
      <ControlArea />
      <Features />
    </footer>
  );
};

export default Footer;
