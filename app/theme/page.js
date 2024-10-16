"use client";
import React, { useEffect, useState, useTransition } from "react";
import ColorPick from "./ColorPick";
import Title from "../../components/Title/Title";
import { useRequestApiAction } from "../../axios/requests/useRequestApiAction";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setPreviewDataInfo } from "../../store/themeSlice";
import { FaTrash } from "react-icons/fa6";

function page() {
  const { GET, PUT } = useRequestApiAction();
  const [themeInfo, setthemeInfo] = useState({});
  const { header, bubble, signup, fontFamily } = themeInfo ?? {};
  const [isPending, startTransition] = useTransition();

  const getThemeUI = async () => {
    const { data } = await GET("/theme");
    if (data.success) {
      setthemeInfo(data.data[0]);
    }
  };

  const applyTheme = () => {
    startTransition(async () => {
      const { data } = await PUT(`/theme/${themeInfo?._id}`, themeInfo);
      if (data.success) {
        // setthemeInfo(data.data[0])
        toast.success("Apply Changes");
      }
    });
  };

  useEffect(() => {
    getThemeUI();
  }, []);
  console.log(themeInfo, "themeInfo");

  //   signup
  // :
  // {primaryLoginColor: "rgb(30, 30, 42)", primaryRegisterColor: "rgb(108 216 193)",…}
  // primaryLoginColor
  // :
  // "rgb(30, 30, 42)"
  // primaryLoginTextColor
  // :
  // "rgb(30, 30, 42)"
  // primaryRegisterColor
  // :
  // "rgb(108 216 193)"
  // primaryRegisterTextColor
  // :
  // "rgb(30, 30, 42)"
  // secondaryColor
  // :
  // "rgb(30, 30, 42)"
  // secondaryTextColor
  // :

  return (
    <>
      <Title title="Theme" themeView={true} />
      <hr className="my-2 mb-5 text-primaryBgColor" />
      <div className="mt-5 flex flex-col h-full">
        <div className="collapse collapse-plus bg-activePrimaryBgColor text-localColor mb-2">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title text-md font-medium">Home</div>
          <div className="collapse-content bg-localColor text-black pt-2">
            <Main header={header} setthemeInfo={setthemeInfo} />
          </div>
        </div>
        <div className="collapse collapse-plus bg-activePrimaryBgColor text-localColor mb-2">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-md font-medium">Login</div>
          <div className="collapse-content bg-localColor text-black pt-2">
            <LoginScreen signup={signup} setthemeInfo={setthemeInfo} />
          </div>
        </div>
        <div className="collapse collapse-plus bg-activePrimaryBgColor text-localColor mb-2">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-md font-medium">Register</div>
          <div className="collapse-content bg-localColor text-black pt-2">
            <RegisterScreen signup={signup} setthemeInfo={setthemeInfo} />
          </div>
        </div>
        <div className="collapse collapse-plus bg-activePrimaryBgColor text-localColor mb-2">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-md font-medium">Chat Bubble</div>
          <div className="collapse-content bg-localColor text-black pt-2">
            <ChatBubble bubble={bubble} setthemeInfo={setthemeInfo} />
          </div>
        </div>
        <div className="collapse collapse-plus bg-activePrimaryBgColor text-localColor mb-2">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-md font-medium">Font Family</div>
          <div className="collapse-content bg-localColor text-black pt-2">
            <FontFamily fontFamily={fontFamily} setthemeInfo={setthemeInfo} />
          </div>
        </div>
        <div className="collapse collapse-plus bg-activePrimaryBgColor text-localColor mb-2">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-md font-medium">Choice Theme</div>
          <div className="collapse-content bg-localColor text-black pt-2">
            <Themes />
          </div>
        </div>

        {/* <div className="flex-1">
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
      </div> */}
        <div className="flex">
          <button
            onClick={applyTheme}
            disabled={isPending}
            className="bg-activePrimaryBgColor text-localColor px-4 py-2 rounded-lg"
          >
            {isPending ? "Submitting..." : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
}

export default page;

const Themes = () => {
  const theme = [
    {
      url: "https://store.enappd.com/wp-content/uploads/2019/01/8-399x800.png",
      price: 0,
    },
    {
      url: "https://store.enappd.com/wp-content/uploads/2019/01/8-399x800.png",
      price: 0,
    },
    {
      url: "https://store.enappd.com/wp-content/uploads/2019/01/8-399x800.png",
      price: 50,
    },
    {
      url: "https://store.enappd.com/wp-content/uploads/2019/01/8-399x800.png",
      price: 20,
    },
  ];

  const [selected, setselected] = useState(0);

  return (
    <div className="grid grid-cols-6 gap-10">
      {theme.map((e, i) => (
        <div
          className={`flex relative flex-col cursor-pointer justify-center items-center w-fit p-3 rounded-xl `}
        >
          <img
            src={
              "https://www.pngall.com/wp-content/uploads/8/Green-Check-Mark-PNG-Clipart.png"
            }
            className={`w-8 mb-3 h-full ${i == selected ? "" : "invisible"}`}
            onClick={() => setselected(i)}
          />
          <img
            src={e.url}
            className="w-32 h-full"
            onClick={() => setselected(i)}
          />
          <p className="pt-3 italic">{e.price > 0 ? "$ " + e.price : "free"}</p>
          {e.price > 0 && (
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/023/289/782/small_2x/a-stunning-and-intricately-designed-golden-crown-perfectly-crafted-with-a-realistic-touch-sits-majestically-on-a-clear-and-transparent-background-generative-ai-png.png"
              className="w-10 h-10 absolute top-10 right-3"
            />
          )}
        </div>
      ))}
    </div>
  );
};

const FontFamily = ({ fontFamily, setthemeInfo }) => {
  const dispatch = useDispatch();
  const [fonturl, setfonturl] = useState({
    font: "",
    fontSize: 5,
    fontName: "",
  });

  const handleChange = () => {
    if(fonturl.font==""){
      alert("Font url required");
      return
    }
    setthemeInfo((prev) => {
      let newData = {
        ...prev,
        fontFamily:
          prev?.fontFamily?.length > 0
            ? [...prev?.fontFamily, fonturl]
            : [fonturl],
      };
      return newData;
    });
    setfonturl({
      font: "",
      fontSize: 5,
      fontName:""
    });
  };

  const handleRemoveChange = (index) => {
    setthemeInfo((prev) => {
      const filterFont = prev?.fontFamily.filter((e, i) => i != index);
      let newData = {
        ...prev,
        fontFamily: filterFont,
      };
      return newData;
    });
  };

  return (
    <div className="p-2">
      <div>
        <input
          placeholder="Enter font name"
          onChange={(e) =>
            setfonturl((p) => {
              return { ...p, fontName: e.target.value };
            })
          }
          value={fonturl.fontName}
          className="w-[20%] p-2 bg-primaryBgColor rounded-md mr-3"
        />
        <input
          placeholder="Enter Google font URL"
          onChange={(e) =>
            setfonturl((p) => {
              return { ...p, font: e.target.value };
            })
          }
          value={fonturl.font}
          className="w-1/2 p-2 bg-primaryBgColor rounded-md mr-3"
        />
        <input
          placeholder="Font Size (PX)"
          min={5}
          type="number"
          onChange={(e) =>
            setfonturl((p) => {
              return { ...p, fontSize: e.target.value };
            })
          }
          value={fonturl.fontSize}
          className=" p-2 bg-primaryBgColor rounded-md mr-3"
        />
        <button
          className="bg-activePrimaryBgColor text-localColor px-4 py-2 rounded-lg"
          onClick={handleChange}
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 p-2 mt-2">
        <div className="flex items-center">
        <p className="w-[20%] font-bold">Font Name</p>
          <p className="w-1/2 font-bold">Font Family</p>
          <p className="w-[10%] font-bold">Font Size</p>
        </div>
        {fontFamily?.map((e, i) => (
          <div className="flex items-center">
            <p className="w-[20%]">{e.fontName}</p>
            <p className="w-1/2">{e.font}</p>
            <p className="w-[10%]">{e.fontSize}</p>
            <FaTrash
              className="ml-5 bg-primaryBgColor cursor-pointer p-2 rounded-md text-3xl text-red-400"
              onClick={() => handleRemoveChange(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatBubble = ({ bubble, setthemeInfo }) => {
  const dispatch = useDispatch();

  const handleChange = (key, val) => {
    setthemeInfo((prev) => {
      let newData = {
        ...prev,
        bubble: {
          ...prev?.bubble,
          [key]: val,
        },
      };
      dispatch(
        setPreviewDataInfo({
          type: "/chat/bubble",
          data: newData,
        })
      );
      return newData;
    });
  };

  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="flex flex-col">
        <p className="mb-2">Background color</p>
        <ColorPick
          val={bubble?.backgroundColor}
          onColorChange={(e) => handleChange("backgroundColor", e)}
        />
      </div>
      <div className="flex flex-col">
        <p className="mb-2">Color</p>
        <ColorPick
          val={bubble?.textColor}
          onColorChange={(e) => handleChange("textColor", e)}
        />
      </div>
      <div className="flex flex-col">
        <p className="mb-2">Icon</p>
        <ImagePick
          value={bubble?.icon}
          onChange={(e) => handleChange("icon", e)}
        />
      </div>
    </div>
  );
};

const LoginScreen = ({ signup, setthemeInfo }) => {
  const dispatch = useDispatch();

  const handleChange = (key, val) => {
    setthemeInfo((prev) => {
      let newData = {
        ...prev,
        signup: {
          ...prev?.signup,
          [key]: val,
        },
      };
      dispatch(
        setPreviewDataInfo({
          type: "/chat/bubble",
          data: newData,
        })
      );
      return newData;
    });
  };

  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="flex flex-col">
        <p className="mb-2">Background color</p>
        <ColorPick
          val={signup?.primaryLoginColor}
          onColorChange={(e) => handleChange("primaryLoginColor", e)}
        />
      </div>
      <div className="flex flex-col">
        <p className="mb-2">Color</p>
        <ColorPick
          val={signup?.primaryLoginTextColor}
          onColorChange={(e) => handleChange("primaryLoginTextColor", e)}
        />
      </div>
      <div className="flex flex-col">
        <p className="mb-2">Icon</p>
        <ImagePick
          value={signup?.loginImage}
          onChange={(e) => handleChange("loginImage", e)}
        />
      </div>
    </div>
  );
};

const RegisterScreen = ({ signup, setthemeInfo }) => {
  const dispatch = useDispatch();

  const handleChange = (key, val) => {
    setthemeInfo((prev) => {
      let newData = {
        ...prev,
        signup: {
          ...prev?.signup,
          [key]: val,
        },
      };
      dispatch(
        setPreviewDataInfo({
          type: "/chat/bubble",
          data: newData,
        })
      );
      return newData;
    });
  };

  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="flex flex-col">
        <p className="mb-2">Background color</p>
        <ColorPick
          val={signup?.primaryRegisterColor}
          onColorChange={(e) => handleChange("primaryRegisterColor", e)}
        />
      </div>
      <div className="flex flex-col">
        <p className="mb-2">Color</p>
        <ColorPick
          val={signup?.primaryRegisterTextColor}
          onColorChange={(e) => handleChange("primaryRegisterTextColor", e)}
        />
      </div>
      <div className="flex flex-col">
        <p className="mb-2">Icon</p>
        <ImagePick
          value={signup?.registerImage}
          onChange={(e) => handleChange("registerImage", e)}
        />
      </div>
    </div>
  );
};

const Main = ({ header, setthemeInfo }) => {
  // console.log(header?.backgroundColor,"header?.backgroundColor")
  const { POST } = useRequestApiAction();

  const dispatch = useDispatch();

  const handleChange = (key, val) => {
    setthemeInfo((prev) => {
      let newData = {
        ...prev,
        header: {
          ...prev?.header,
          [key]: val,
        },
      };
      dispatch(
        setPreviewDataInfo({
          type: "/chat/list",
          data: newData,
        })
      );
      return newData;
    });
  };

  const applyAll = async () => {
    const { data } = await POST("/theme/applyForAll", {
      bgcolor: header?.backgroundColor,
      color: header?.textColor,
    });
    console.log(data, "data");
    if (data?.success) {
      toast("Apply colors for all chat");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="flex flex-col">
        <p className="mb-2">Primary color</p>
        <ColorPick
          val={header?.backgroundColor}
          onColorChange={(e) => handleChange("backgroundColor", e)}
        />
      </div>
      <div className="flex flex-col">
        <p className="mb-2">text color</p>
        <ColorPick
          val={header?.textColor}
          onColorChange={(e) => handleChange("textColor", e)}
        />
      </div>
      <div className="flex flex-col">
        <p className="mb-2">Logo</p>
        <ImagePick
          value={header?.logo}
          onChange={(e) => handleChange("logo", e)}
        />
      </div>
      <div>
        <button
          onClick={applyAll}
          className="bg-activePrimaryBgColor text-localColor px-4 py-2 rounded-lg"
        >
          Apply all
        </button>
      </div>
    </div>
  );
};

const ImagePick = ({
  onChange,
  value = "https://pngimg.com/d/nike_PNG12.png",
}) => {
  const [editImage, setEditImage] = useState(false);
  return (
    <div className="flex">
      {editImage ? (
        <>
          <div
            className="fixed left-0 top-0 w-full h-full z-0"
            onClick={() => setEditImage(false)}
          ></div>
          <input
            className="h-8 rounded-md outline-none bg-white z-10"
            onChange={(e) => {
              onChange(e.target.value);
              setEditImage(false);
            }}
          />
        </>
      ) : (
        <>
          <img
            src={value}
            alt="image"
            className="max-w-40 max-h-40 rounded-lg cursor-pointer"
            onClick={() => setEditImage(true)}
          />
        </>
      )}
    </div>
  );
};
