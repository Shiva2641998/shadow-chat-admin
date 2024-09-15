import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authState: false,
  preview: false,
  access_token: {},
  previewData: {}
};

export const themeSlice = createSlice({
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
      console.log("login",action.payload)
      state.access_token = action.payload;
    },
    setPreviewDataInfo: (state, action) => {
      if(action.payload?.data){
        console.log(action.payload,"action.payload")
        state.previewData = {...action.payload};
      }
    },
  },
});

export const { setAuthState, previewToggle, setAccessTokenInfo, setPreviewDataInfo } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
