import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../css/auth/Auth.css";
import Modal from "../common/Modal";
import Signup from "./Signup";
import Login from "./Login";
import { logout } from "../../redux/slices/authSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <div className="auth-container">
        {!isAuthenticated ? (
          <>
            <button
              className="auth-btn signup"
              onClick={() => setOpenSignup(true)}
            >
              Signup
            </button>
            <button
              className="auth-btn login"
              onClick={() => setOpenLogin(true)}
            >
              Login
            </button>
          </>
        ) : (
          <button className="auth-btn logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      {openSignup && (
        <Modal onClose={() => setOpenSignup(false)}>
          <Signup onClose={() => setOpenSignup(false)} />
        </Modal>
      )}

      {openLogin && (
        <Modal onClose={() => setOpenLogin(false)}>
          <Login onClose={() => setOpenLogin(false)} />
        </Modal>
      )}
    </>
  );
};

export default Auth;
