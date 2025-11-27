import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import MainArea from "./MainArea";
import "../css/HomePage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="homepage-main">
        <div className="homepage-sidebar">
          <SideMenu />
        </div>
        {/* Rightside */}
        <div className="homepage-content">
          <MainArea />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
