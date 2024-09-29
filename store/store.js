import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { themeReducer } from "./themeSlice";
import persistReducer from "redux-persist/es/persistReducer";
import { thunk } from "redux-thunk";
import storageSession from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  theme: themeReducer
});

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


// export const store = configureStore({
//   reducer: { theme: themeReducer }
// });

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if needed for redux-persist
    }).concat(thunk),
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
