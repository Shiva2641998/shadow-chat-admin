import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authState: false,
  preview: false,
  access_token: false,
  previewData: {
    type: "",
    data: {}
  }
};

export const authSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.authState = action.payload;
    },
    previewToggle: (state) => {
      state.preview = !state.preview;
    },
    setAccessTokenInfo: (state, action) => {
      state.access_token = action.payload;
    },
    setPreviewDataInfo: (state, action) => {
      state.previewData = action.payload;
    },
  },
});

export const { setAuthState, previewToggle, setAccessTokenInfo, setPreviewDataInfo } = authSlice.actions;
export const authReducer = authSlice.reducer;
