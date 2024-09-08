import React, { useEffect, useState } from "react";
import ChatPage from "./ChatPage";
import ChatList from "./ChatList";

function PreviewComponent() {
  const [path, setpath] = useState("/");
  useEffect(() => {
    const { pathname } = window.location;
    console.log(pathname, "pathname");
    setpath(pathname);
  }, []);

  switch (path) {
    case "/Chat":
      return <ChatPage />;
    case "/ChatList":
      return <ChatList />;
    default:
      return <ChatPage />;
    //   return <saytv-chat bubble="false" authentication="true"></saytv-chat>;
  }
}

export default PreviewComponent;
