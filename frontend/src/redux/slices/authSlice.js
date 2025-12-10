import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action : When API call starts
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },

    // Action : Login/Register
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },

    // Action : Set error message
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Action : Logout user
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },

    // Action: Clear error message
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setUser, setError, logout, clearError } =
  authSlice.actions;

export default authSlice.reducer;
