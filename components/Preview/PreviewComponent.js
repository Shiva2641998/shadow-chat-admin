import React, { useEffect, useState } from "react";
import ChatPage from "./ChatPage";
import ChatList from "./ChatList";
import { usePathname } from "next/navigation";

function PreviewComponent() {
  const [path, setpath] = useState("/");
  const pathname = usePathname();
  useEffect(() => {
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
