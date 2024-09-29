"use client";
import { Provider } from "react-redux";
import Childlayout from "./Childlayout";
import { persistor, store } from "../store/store";
import { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";

function Wrapperlayout({ children }) {
  const scriptId = "saytv-chat-script";

  useEffect(() => {
    const addScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://shiva2641998.github.io/shadow-chat-bundle/shadow-chat.js";
      script.type = "module";
      script.id = scriptId;

      // Once script loads, create the custom element
      script.onload = () => {};

      document.body.appendChild(script);
    };

    addScript();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Childlayout>{children}</Childlayout>
      </PersistGate>
    </Provider>
  );
}

export default Wrapperlayout;
