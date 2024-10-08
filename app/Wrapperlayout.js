"use client";
import { Provider } from "react-redux";
import Childlayout from "./Childlayout";
import { persistor, store } from "../store/store";
import { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";

function Wrapperlayout({ children }) {
 

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Childlayout>{children}</Childlayout>
      </PersistGate>
    </Provider>
  );
}

export default Wrapperlayout;
