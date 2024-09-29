import { IoChatbubblesOutline } from "react-icons/io5";
import { VscSymbolColor } from "react-icons/vsc";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { RiAdvertisementFill, RiHashtag, RiShieldUserLine } from "react-icons/ri";
import { MdOutlineEmojiEvents } from "react-icons/md";


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
    path: "/fanzone",
    sidebarProps: {
      displayText: "Fanzone",
      Icon: MdOutlineEmojiEvents,
    }
  },
  {
    path: "/Ads/",
    sidebarProps: {
      displayText: "Ads",
      Icon: RiAdvertisementFill,
    },
    child: [
      {
        index: true,
        path: "/ads/advertiesment",
        displayText: "Advertiesment",
      },
      {
        path: "/ads/slot",
        displayText: "Slot",
      },
    ],
  },
  {
    path: "/theme",
    sidebarProps: {
      displayText: "Theme",
      Icon: VscSymbolColor,
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