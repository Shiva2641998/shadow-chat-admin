import React, { memo, useEffect, useState } from "react";
import ChatPage from "./ChatPage";
import ChatQuiz from "./ChatQuiz";
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
  
  switch (type) {
    case "/chat/rooms":
      return <ChatPage path={type} />;
    case "/chat/quiz":
      return <ChatQuiz path={type} />;
    default:
      return <ChatPage path={type} />;
    //   return <saytv-chat bubble="false" authentication="true"></saytv-chat>;
  }
}

export default memo(PreviewComponent);
