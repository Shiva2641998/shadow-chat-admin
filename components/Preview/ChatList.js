import React, { useEffect, useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useRequestApiAction } from "../../axios/requests/useRequestApiAction";

function ChatList({ path }) {
  const { previewData } = useSelector((state) => state.theme);
  const { data, type } = previewData;
  const [roomList, setroomList] = useState([])
  const { GET } = useRequestApiAction();

  if (previewData?.type != path || !previewData) {
    return <div></div>;
  }

  const getRoomList = async () => {
    const { data } = await GET("/rooms");
    setroomList(
      data.data.map((item) => ({
        id: item._id, // Map _id to id
        ...item,
      }))
    );
  };

  useEffect(() => {
    getRoomList()
  }, [])
  

  const { header } = data;

  return (
    <div className="p-1 relative h-full" >
      <div className="absolute top-0 left-0 h-full w-full z-10" style={{
      backgroundImage: `url(${header.logo})`,
      backgroundSize:"contain",
      backgroundPosition: 'center center',
      backgroundRepeat:"no-repeat"
    }}></div>
      <div className="absolute top-0 left-0 h-full w-full opacity-40 `z-0" style={{
        backgroundColor: header?.backgroundColor
      }}></div>
      <div
        className={`flex justify-between p-1 rounded-md relative z-10`}
        style={{
          backgroundColor: header?.backgroundColor,
          color: header?.textColor,
        }}
      >
        <RiMenu2Fill />
        <img src={header?.logo} className="w-fit h-4 rounded-sm" alt="image" />
        <div className="w-2"></div>
      </div>
      <div className="z-10 relative overflow-y-scroll">
        <div className="w-full">
          {roomList.map((e, i) => {
            console.log(e)
              return (
                <div className="relative rounded-md" style={{
                  background: `url(${e.bgImage}) center center`,
                  backgroundSize:"cover"
                }}>
                  <div className="absolute top-0 left-0 h-full w-full opacity-40 rounded-md z-[2]" style={{
                    backgroundColor: e?.primaryBgColor
                  }}></div>
                <div className="flex justify-between items-start my-2 rounded-md overflow-hidden relative z-10"
                style={{ color: e.primaryTextColor}}
                >
                  <div className="flex">
                    <img
                      alt="image"
                      className="w-10 h-full"
                      src={e.image}
                    />
                  <div className="ml-2">
                    <p className="truncate w-28 text-xs">{e.name}</p>
                    <p className="text-[12px]">{e.messages[e.messages?.length - 1]?.content}</p>
                  </div>
                  </div>
                  <div className="p-1">
                    <p
                    className="rounded-md p-.5 px-1 text-xs font-semibold"
                    style={{
                      backgroundColor: e?.primaryBgColor,
                      color: e?.primaryTextColor,
                    }}
                    >{e.messages?.length}</p>
                  </div>
                </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ChatList;
