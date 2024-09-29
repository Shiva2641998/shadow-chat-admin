"use client";
import React, { useState } from "react";
import ColorPick from "./ColorPick";
import Title from "../../components/Title/Title";

function page() {
  return (
    <>
    <Title title="Theme" themeView={true} />
      <hr className="my-2 mb-5 text-primaryBgColor" />
    <div className="mt-5 flex flex-col h-full">
      <div className="flex-1">
      <div role="tablist" className="tabs tabs-boxed bg-transparent">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab !w-40"
          aria-label="Home"
        />
        <div role="tabpanel" className="tab-content p-10">
          <Main />
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab !w-40"
          aria-label="Chat Bubble"
        />
        <div role="tabpanel" className="tab-content p-10">
          <ChatBubble />
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab !w-40"
          aria-label="Choice Theme"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10">
          <Themes />
        </div>
      </div>
      </div>
      <div className="flex">
      <button className="bg-activePrimaryBgColor text-localColor px-4 py-2 rounded-lg">Save Changes</button>
      </div>
    </div>
    </>
  );
}

export default page;

const Themes = () => {
  const theme = [{url:'https://store.enappd.com/wp-content/uploads/2019/01/8-399x800.png',price: 0},{url:'https://store.enappd.com/wp-content/uploads/2019/01/8-399x800.png',price: 0},{url:'https://store.enappd.com/wp-content/uploads/2019/01/8-399x800.png',price: 0},{url:'https://store.enappd.com/wp-content/uploads/2019/01/8-399x800.png',price: 20}]
  const [selected, setselected] = useState(0)
  return (
    <div className="grid grid-cols-6 gap-10">
      {
        theme.map((e,i) => <div className={`flex relative flex-col cursor-pointer justify-center items-center w-fit p-3 rounded-xl ${ i == selected ? "!shadow-md !shadow-activePrimaryBgColor" : ""}`}>
        <img src={e.url} className="w-32 h-full" onClick={() => setselected(i)} />
       <p className="pt-3 italic">{e.price > 0 ? "$ " + e.price : "--"}</p>
       {e.price > 0 && <img src="https://static.vecteezy.com/system/resources/thumbnails/023/289/782/small_2x/a-stunning-and-intricately-designed-golden-crown-perfectly-crafted-with-a-realistic-touch-sits-majestically-on-a-clear-and-transparent-background-generative-ai-png.png" className="w-10 h-10 absolute top-0 right-3" />}
      </div>)
      }
      
    </div>
  );
};

const ChatBubble = () => {
  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="flex flex-col">
        <p className="mb-2">Background color</p>
        <ColorPick />
      </div>
      <div className="flex flex-col">
        <p className="mb-2">Color</p>
        <ColorPick />
      </div>
      <div className="flex flex-col">
        <p className="mb-2">Icon</p>
        <ImagePick />
      </div>
    </div>
  );
};

const Main = () => {
  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="flex flex-col">
        <p className="mb-2">Primary color</p>
        <ColorPick />
      </div>
      <div className="flex flex-col">
        <p className="mb-2">Secondary color</p>
        <ColorPick />
      </div>
      <div className="flex flex-col">
        <p className="mb-2">text color</p>
        <ColorPick />
      </div>
      <div className="flex flex-col">
        <p className="mb-2">Logo</p>
        <ImagePick />
      </div>
    </div>
  );
};

const ImagePick = ({onChange, value = "https://pngimg.com/d/nike_PNG12.png"}) => {
  const [editImage, setEditImage] = useState(false);
  return (
    <div className="flex">
      {editImage ? (
        <>
        <div className="fixed left-0 top-0 w-full h-full z-0" onClick={() => setEditImage(false)}></div>
          <input
            className="h-8 rounded-md outline-none bg-white z-10"
            onChange={(e) => {
              onChange(e)
              setEditImage(false);
            }}
          />
        </>
      ) : (
        <>
          <img
            src={value}
            className="max-w-40 max-h-40 rounded-lg cursor-pointer"
            onClick={() => setEditImage(true)}
          />
        </>
      )}
    </div>
  );
}
