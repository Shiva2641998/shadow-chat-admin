import { IoIosChatbubbles } from "react-icons/io";
import { IoColorFill } from "react-icons/io5";

const appRoutes = [
  {
    path: "/chat",
    sidebarProps: {
      displayText: "Chat",
      icon: <IoIosChatbubbles />,
    },
    child: [
      {
        index: true,
        path: "/chat/rooms",
        displayText: "Rooms",
      },
      {
        path: "/chat/messages",
        displayText: "Messages",
      },
      {
        path: "/chat/settings",
        displayText: "Settings",
      },
    ],
  },
  {
    path: "/theme",
    sidebarProps: {
      displayText: "Theme",
      icon: <IoColorFill />,
    },
    child: [
      {
        index: true,
        path: "/theme/header",
        displayText: "Header",
      },
      {
        path: "/theme/chatlist",
        displayText: "ChatList",
      },
      {
        path: "/theme/chat",
        displayText: "Chat",
      },
    ],
  },
  // Add more routes as needed
];

export default appRoutes;