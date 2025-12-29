import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import Input from "../common/Input";
import axios from "axios";
import { switchAuthMode, closeAuthModal } from "../../redux/slices/uiSlice";
import {
  setLoading,
  setUser,
  setError,
  clearError,
} from "../../redux/slices/authSlice";
import "../../css/auth/Login.css";
const API_URL = import.meta.env.VITE_API_URL;
const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const { authMode } = useSelector((state) => state.ui);
  const isForgot = authMode === "forgot";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Forgot Password
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    if (!validator.isEmail(email)) {
      dispatch(setError("Please enter a valid email address"));
      return;
    }

    if (!password) {
      dispatch(setError("Please enter your password"));
      return;
    }

    dispatch(setLoading(true));
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      const data = res.data || {};

      dispatch(
        setUser({
          user: data.user,
          token: data.token,
        })
      );
      localStorage.setItem("token", data.token);
      dispatch(closeAuthModal());

      console.log("Login successful!");
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message || error?.response?.data?.error;
      dispatch(setError(serverMessage || "Login failed. Please try again."));
    }
  };
  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setForgotMsg("Please enter your email");
      return;
    }

    try {
      setForgotMsg("Sending reset link...");
      await axios.post(`${API_URL}/api/auth/forgot-password`, {
        email: forgotEmail,
      });
      setForgotMsg("Reset link sent! Check your email 📩");
    } catch (error) {
      setForgotMsg(
        error?.response?.data?.message || "Failed to send reset email"
      );
    }
  };
  return (
    <div className="login-wrapper">
      <h3 className="login-title">Welcome Back</h3>
      <p className="login-subtitle">Please enter your details to login in</p>
      <form onSubmit={handleLogin} className="login-form">
        {!isForgot && (
          <>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label={"Email Address"}
              placeholder={"example@gmail.com"}
              type="email"
            />
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
            />
          </>
        )}

        {/* Forgot password link */}
        <div className="forgot-wrapper">
          {!isForgot ? (
            <>
              <span
                className="forgot-link"
                onClick={() => {
                  dispatch(clearError());
                  dispatch(switchAuthMode("forgot"));
                }}
              >
                Forgot password?
              </span>
              <span
                className="forgot-link"
                onClick={() => {
                  dispatch(clearError());
                  dispatch(switchAuthMode("signup"));
                }}
              >
                Don't have an account? Signup
              </span>
            </>
          ) : (
            <div className="forgot-box">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your registered email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />

              {forgotMsg && <p className="forgot-msg">{forgotMsg}</p>}

              <button
                type="button"
                className="forgot-btn"
                onClick={handleForgotPassword}
              >
                Send Reset Link
              </button>
            </div>
          )}
        </div>

        {error && <div className="login-error">{error}</div>}
        {!isForgot && (
          <button
            type="submit"
            className="login-submit-btn"
            disabled={isLoading}
          >
            <span> {isLoading ? "Logging in..." : "LOGIN"}</span>
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
