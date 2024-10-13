import React, { memo, useEffect, useState } from "react";
import ChatPage from "./ChatPage";
import ChatQuiz from "./ChatQuiz";
import ChatList from "./ChatList";
import ChatFanzone from "./ChatFanzone";
import EmptyView from "./EmptyView";
import ChatBubble from "./ChatBubble";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

function PreviewComponent() {
//   const [path, setpath] = useState("/");
//   const pathname = usePathname();
//   useEffect(() => {
//     setpath(pathname);
//   }, []);
// console.log("pathname::",pathname)
const { previewData } = useSelector((state) => state.theme);
  const { data, type } = previewData;
  console.log(type)
  switch (type) {
    case "/chat/rooms":
      return <ChatPage path={type} />;
    case "/chat/quiz":
      return <ChatQuiz path={type} />;
    case "/chat/fanzone":
      return <ChatFanzone path={type} />;
    case "/chat/list":
      return <ChatList path={type} />;
    case "/chat/bubble":
      return <ChatBubble path={type} />;
    default:
      return <EmptyView path={type} />;
  }
}

export default memo(PreviewComponent);
