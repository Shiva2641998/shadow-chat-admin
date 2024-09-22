import { IoChatbubblesOutline } from "react-icons/io5";
import { VscSymbolColor } from "react-icons/vsc";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { RiHashtag, RiShieldUserLine } from "react-icons/ri";


const appRoutes = [
  {
    path: "/chat/",
    sidebarProps: {
      displayText: "Chat",
      Icon: IoChatbubblesOutline,
    },
    child: [
      {
        index: true,
        path: "/chat/rooms",
        displayText: "Rooms",
      },
      {
        path: "/chat/quiz",
        displayText: "Quiz",
      },
    ],
  },

  {
    path: "/users",
    sidebarProps: {
      displayText: "Users",
      Icon: PiUsersThreeDuotone,
    }
  },
  {
    path: "/hashtaglist",
    sidebarProps: {
      displayText: "Hashtag list",
      Icon: RiHashtag,
    }
  },
  {
    path: "/admin",
    sidebarProps: {
      displayText: "Admin Chat",
      Icon: RiShieldUserLine,
    }
  },
  // {
  //   path: "/theme/",
  //   sidebarProps: {
  //     displayText: "Theme",
  //     Icon: VscSymbolColor,
  //   },
  //   child: [
  //     {
  //       index: true,
  //       path: "/theme/header",
  //       displayText: "Header",
  //     },
  //     {
  //       path: "/theme/chatlist",
  //       displayText: "ChatList",
  //     },
  //     {
  //       path: "/theme/chat",
  //       displayText: "Chat",
  //     },
  //   ],
  // },
  // Add more routes as needed
];

export default appRoutes;