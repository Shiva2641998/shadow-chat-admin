"use client";
import { Provider } from "react-redux";
import Childlayout from "./Childlayout";
import { store } from "../store/store";

function Wrapperlayout({ children }) {
  return (
    <Provider store={store}>
      <Childlayout>{children}</Childlayout>
    </Provider>
  );
}

export default Wrapperlayout;
