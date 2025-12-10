import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setUser,
  setError,
  clearError,
} from "../../redux/slices/authSlice";
import Input from "../common/Input";
import axios from "axios";
import "../../css/auth/Signup.css";

const Signup = ({ onClose }) => {
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    if (!fullName || !email || !password) {
      dispatch(setError("Please fill all fields"));
      return;
    }
    dispatch(setLoading(true));

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name: fullName,
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

      console.log("Signup successful!");
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message || error?.response?.data?.error;
      dispatch(setError(serverMessage || "Signup failed. Please try again."));
    }
  };
  return (
    <div className="signup-wrapper">
      <h3 className="signup-title">Create an Account</h3>
      <p className="signup-subtitle">Join us today by entering your details</p>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <Input
            label={"Name"}
            type={"text"}
            placeholder={"Enter your Name"}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <Input
            label={"Email"}
            type={"email"}
            placeholder={"Enter your Email Id"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            label={"Password"}
            type={"password"}
            placeholder={"Enter your Password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {error && <div className="signup-error">{error}</div>}

        <div className="signup-actions">
          <button
            type="submit"
            className="signup-btn-submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing..." : "Signup"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
