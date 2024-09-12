import React, { memo, useEffect, useState } from "react";
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
    case "/chat/rooms":
      return <ChatPage path={path} />;
    case "/ChatList":
      return <ChatList path={path} />;
    default:
      return <ChatPage path={path} />;
    //   return <saytv-chat bubble="false" authentication="true"></saytv-chat>;
  }
}

export default memo(PreviewComponent);
