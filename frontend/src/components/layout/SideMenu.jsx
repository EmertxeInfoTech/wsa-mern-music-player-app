import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosSettings } from "react-icons/io";
import EditProfile from "../auth/EditProfile";
import Modal from "../common/Modal";
import "../../css/sidemenu/SideMenu.css";
import { CiUser } from "react-icons/ci";
const SideMenu = ({ active = "Home" }) => {
  const [openEditProfile, setOpenEditProfile] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const displayUser = {
    name: user?.name || "Guest",
    avatar: user?.avatar || "",
  };

  return (
    <>
      <aside className="sidemenu-root">
        <div className="sidemenu-header">
          <img
            src="../assets/wsa-logo.jpg"
            alt="selvam"
            className="sidemenu-logo-img"
          />
          <h2 className="sidemenu-logo-title">Synthesia</h2>
        </div>

        <nav className="sidemenu-nav" aria-label="Main navigation">
          <ul className="sidemenu-nav-list">
            <li>
              <button className="sidemenu-nav-btn">Home</button>
            </li>
            <li>
              <button className="sidemenu-nav-btn">Search</button>
            </li>
            <li>
              <button className="sidemenu-nav-btn">My Favourite</button>
            </li>
          </ul>
        </nav>
        <div className="flex-1"></div>
        <div className="sidemenu-profile-row">
          {isAuthenticated ? (
            <img className="sidemenu-avatar-img" src={displayUser.avatar} />
          ) : (
            <div className="profile-placeholder">
              <CiUser size={30} />
            </div>
          )}

          <div className="sidemenu-username-wrapper">
            <div className="sidemenu-username">
              {displayUser.name || "Guest"}
            </div>
          </div>
          {isAuthenticated && (
            <div className="settings-container">
              <button
                type="button"
                className="sidemenu-settings-btn"
                onClick={() => setOpenEditProfile(true)}
              >
                <IoIosSettings size={20} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* EDIT PROFILE MODAL */}
      {openEditProfile && (
        <Modal onClose={() => setOpenEditProfile(false)}>
          <EditProfile onClose={() => setOpenEditProfile(false)} />
        </Modal>
      )}
    </>
  );
};

export default SideMenu;
