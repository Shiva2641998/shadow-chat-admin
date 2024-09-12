import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { themeReducer } from "./themeSlice";

export const store = configureStore({
  reducer: { theme: themeReducer }
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
