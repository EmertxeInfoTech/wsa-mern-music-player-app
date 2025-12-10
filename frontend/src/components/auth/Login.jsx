import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import Input from "../common/Input";
import axios from "axios";
import {
  setLoading,
  setUser,
  setError,
  clearError,
} from "../../redux/slices/authSlice";
import "../../css/auth/Login.css";

const Login = ({ onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      const res = await axios.post("http://localhost:5000/api/auth/login", {
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
      if (onClose) {
        onClose();
      }

      console.log("Login successful!");
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message || error?.response?.data?.error;
      dispatch(setError(serverMessage || "Login failed. Please try again."));
    }
  };
  return (
    <div className="login-wrapper">
      <h3 className="login-title">Welcome Back</h3>
      <p className="login-subtitle">Please enter your details to login in</p>
      <form onSubmit={handleLogin} className="login-form">
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
        {error && <div className="login-error">{error}</div>}
        <button type="submit" className="login-submit-btn" disabled={isLoading}>
          {isLoading ? "Logging in..." : "LOGIN"}
        </button>
      </form>
    </div>
  );
};

export default Login;
