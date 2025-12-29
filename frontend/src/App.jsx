import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ResetPassword from "./components/auth/ResetPassword";
import axios from "axios";
import {
  setUser,
  logout,
  setLoading,
  setError,
  clearError,
} from "./redux/slices/authSlice";
import Homepage from "./pages/Homepage";

import "./App.css";
// Backend API base URL
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  useEffect(() => {
    const storedToken = token || localStorage.getItem("token");
    if (!storedToken || user) return;

    const fetchUser = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());

        const res = await axios.get(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        dispatch(setUser({ user: res.data, token: storedToken }));
      } catch (error) {
        console.error("getMe failed:", error);
        dispatch(logout());
        dispatch(
          setError(
            error?.response?.data?.message ||
              "Session expired.Please log in again"
          )
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch, token, user]);
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Homepage />} />

        {/* Reset Password */}
        {/* If user click the reset link in mailtrap */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
