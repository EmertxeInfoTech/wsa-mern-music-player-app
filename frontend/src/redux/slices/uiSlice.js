import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    loginModalOpen: false,
  },
  reducers: {
    // Open login modal (called when user tries to access protected features)
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    // Close login modal (called after successful login or user cancels)
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
  },
});

export const { openLoginModal, closeLoginModal } = uiSlice.actions;
export default uiSlice.reducer;
