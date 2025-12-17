import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosSettings } from "react-icons/io";
import EditProfile from "../auth/EditProfile";
import Modal from "../common/Modal";
import "../../css/sidemenu/SideMenu.css";
import { CiUser } from "react-icons/ci";
import { AiOutlineHome, AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
import { openLoginModal } from "../../redux/slices/uiSlice";
const SideMenu = ({ setView, view }) => {
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const displayUser = {
    name: user?.name || "Guest",
    avatar: user?.avatar || "",
  };
  const handleSearchClick = () => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      return;
    }
    setView("search");
  };
  const handleFavouriteClick = () => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      return;
    }
    setView("favourite");
  };
  const getNavBtnClass = (item) =>
    `sidemenu-nav-btn ${view === item ? "active" : ""}`;
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
              <button
                className={getNavBtnClass("home")}
                onClick={() => setView("home")}
              >
                <AiOutlineHome className="sidemenu-nav-icon" size={18} />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleSearchClick}
                className={getNavBtnClass("search")}
              >
                <AiOutlineSearch className="sidemenu-nav-icon" size={18} />
                <span> Search</span>
              </button>
            </li>
            <li>
              <button
                className={getNavBtnClass("favourite")}
                onClick={() => handleFavouriteClick()}
              >
                <AiOutlineHeart className="sidemenu-nav-icon" size={18} />
                <span> My Favourite</span>
              </button>
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
