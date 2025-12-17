import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../css/auth/Auth.css";
import Modal from "../common/Modal";
import Signup from "./Signup";
import Login from "./Login";
import { logout } from "../../redux/slices/authSlice";
import { openLoginModal, closeLoginModal } from "../../redux/slices/uiSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { loginModalOpen } = useSelector((state) => state.ui);
  const [openSignup, setOpenSignup] = useState(false);

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
              onClick={() => dispatch(openLoginModal())}
            >
              Login
            </button>
          </>
        ) : (
          <button
            className="auth-btn logout"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        )}
      </div>

      {openSignup && (
        <Modal onClose={() => setOpenSignup(false)}>
          <Signup onClose={() => setOpenSignup(false)} />
        </Modal>
      )}

      {loginModalOpen && (
        <Modal onClose={() => dispatch(closeLoginModal())}>
          <Login onClose={() => dispatch(closeLoginModal())} />
        </Modal>
      )}
    </>
  );
};

export default Auth;
