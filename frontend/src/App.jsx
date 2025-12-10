import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const data = res.data || {};

        dispatch(setUser({ user: data.user, token: storedToken }));
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
    <>
      <Homepage />
    </>
  );
}

export default App;
