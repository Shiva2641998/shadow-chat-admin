import React from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoIosPause } from "react-icons/io";
import { RiHashtag } from "react-icons/ri";
import { IoGameController } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";

const imgURL =
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

function ChatPage({ path }) {
  const { previewData } = useSelector((state) => state.theme);
  const { data, type } = previewData;
  console.log(previewData, "previewData");
  if (previewData?.type != path || !previewData) {
    return <div></div>;
  }

  const bgColor = data?.primaryBgColor || "#000";
  const TextColor = data?.primaryTextColor || "#fff";

  return (
    <div
      
      style={{
        backgroundImage: `url(${data?.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: TextColor,
      }}
    >
      <div className="absolute w-full h-full bg-black opacity-40 z-[2]"></div>
      <div className={`flex flex-col h-full rounded-md relative z-[3]`} style={{
        padding: "11px 4px"}}>
      <div
        className="header flex justify-between items-center px-1.5 py-1 rounded-md mb-1 z-10"
        style={{ backgroundColor: bgColor, color: TextColor }}
      >
        <RiMenu2Fill className="text-xs" />
        <p className="text-xs">Chat Page</p>
        <FaUser className="text-xs" />
      </div>
      <div className="header flex justify-end items-center rounded-md mb-1 z-10">
        <IoIosPause
          className="mx-1 text-xl rounded-lg px-1  p-1"
          style={{ backgroundColor: bgColor, color: TextColor }}
        />
        <RiHashtag
          className="mx-1 text-xl rounded-lg px-1  p-1"
          style={{ backgroundColor: bgColor, color: TextColor }}
        />
        <IoGameController
          className="mx-1 text-xl rounded-lg px-1  p-1"
          style={{ backgroundColor: bgColor, color: TextColor }}
        />
      </div>
      <div
        className="header flex justify-end items-center px-1.5 py-1 rounded-md mb-1 z-10"
        style={{ backgroundColor: bgColor, color: TextColor }}
      >
        <p className="flex-1 text-xs">{data?.name}</p>
        <FaChevronDown className="text-xs" />
      </div>
      <div
        className="my-1 px-2 flex-1 rounded-md z-10"
        style={{ color: TextColor }}
      >
        {Array(4)
          .fill(5)
          .map((e, i) => {
            return (
              <div key={i} className="flex items-end mb-2 chat chat-start">
                <img src={imgURL} className="w-5 h-5 rounded-full" />
                <div
                  className="chat-bubble"
                  style={{ backgroundColor: bgColor, color: TextColor }}
                >
                  <span style={{ fontSize: 10 }}>this is a Message</span>
                </div>
              </div>
            );
          })}
      </div>
      <div
        className="flex items-center rounded-md px-1.5 py-1 z-10"
        style={{ backgroundColor: bgColor, color: TextColor }}
      >
        <input
          className={`w-full bg-transparent text-xs px-2 placeholder:text-[${TextColor}] placeholder:text-xs outline-none`}
          placeholder="Type anything"
        />
        <IoIosSend className="w-3 h-3" />
      </div>
      </div>
    </div>
  );
}

export default ChatPage;
