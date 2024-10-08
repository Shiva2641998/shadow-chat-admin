import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: {
    isDrawerOpen: false,
    pathName: '/',
  },
  authState: false,
  preview: false,
  access_token: false,
  previewData: {}
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.authState = action.payload;
    },
    setSidebar: (state, action) => {
      state.sidebar.isDrawerOpen = !state.sidebar?.isDrawerOpen;
      state.sidebar.pathName = action.payload ?? state.sidebar.pathName;
    },
    previewToggle: (state) => {
      state.preview = !state.preview;
    },
    closePreviewToggle: (state) => {
      state.preview = false;
    },
    setAccessTokenInfo: (state, action) => {
      state.access_token = action.payload;
    },
    setPreviewDataInfo: (state, action) => {
      if(action.payload?.data){
        state.previewData = {...action.payload};
      }
    },
  },
});

export const { setAuthState, previewToggle, closePreviewToggle, setAccessTokenInfo, setPreviewDataInfo, setSidebar } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
