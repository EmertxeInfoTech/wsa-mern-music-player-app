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
    // Set loading state during API calls (login, register, fetchUser)
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },

    // Set user data after successful login/register/fetchUser
    // Also stores token in localStorage for persistence
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;

      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
    },

    // Set error message when API calls fail
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Clear all auth state and remove token from localStorage
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },
    // Update user's favourite songs (after add/remove favourite)
    updateFavourites: (state, action) => {
      if (state.user) {
        state.user.favourites = action.payload;
      }
    },
    // Clear error message
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setUser,
  setError,
  logout,
  clearError,
  updateFavourites,
} = authSlice.actions;

export default authSlice.reducer;
