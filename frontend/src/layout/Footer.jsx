import React from "react";
import SongDetail from "../components/SongDetail";
import ControlArea from "../components/ControlArea";
import Features from "../components/Features";
import "../css/Footer.css";
const Footer = () => {
  return (
    <footer className="app-footer">
      <SongDetail />
      <ControlArea />
      <Features />
    </footer>
  );
};

export default Footer;
