"use client";
import React, { useEffect, useState, useTransition } from "react";
import Title from "../../components/Title/Title";
import { useDispatch } from "react-redux";
import { useRequestApiAction } from "../../axios/requests/useRequestApiAction";
import { toast } from "react-toastify";

function page() {
  const { PUT, GET } = useRequestApiAction();

  const dispatch = useDispatch();

  const [themeInfo, setthemeInfo] = useState({});
  const [isPending, startTransition] = useTransition();

  const getThemeUI = async () => {
    const { data } = await GET("/theme");
    if (data.success) {
      setthemeInfo(data.data[0]);
    }
  };

  const handleChange = (key, val) => {
    setthemeInfo((prev) => {
      let newData = {
        ...prev,
        customize: {
          ...prev?.customize,
          [key]: val,
        },
      };
      //   dispatch(
      //     setPreviewDataInfo({
      //       type: "/chat/list",
      //       data: newData,
      //     })
      //   );
      return newData;
    });
  };

  const applyAll = async () => {
    startTransition(async () => {
      const { data } = await PUT(`/theme/${themeInfo?._id}`, themeInfo);
      console.log(data, "data");
      if (data?.success) {
        toast("Apply colors for all chat");
      }
    });
  };

  useEffect(() => {
    getThemeUI();
  }, []);

  return (
    <div>
      <Title title="Customization tool" themeView={true} />
      <hr className="my-2 mb-5 text-primaryBgColor" />

      <div>
        <h3 className="font-bold">Header</h3>
        <div className="p-4">
          <div className="flex overflow-x-scroll w-full ">
            {Array(3)
              .fill(0)
              .map((event, index) => (
                <div className="flex flex-col items-center pr-10 w-96 " key={index}>
                  <img
                    src="https://talkjs.com/resources/content/images/wordpress/2021/04/th2.png"
                    className="h-14 w-80"
                  />
                  <input
                    type="radio"
                    name="header-4"
                    className="radio !radio-accent mt-2"
                    checked={themeInfo.customize?.header == (index + 1)}
                    onChange={(e) => handleChange("header", index + 1)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold">Sub Header</h3>
        <div className="p-4">
          <div className="flex overflow-x-scroll w-full ">
            {Array(3)
              .fill(0)
              .map((event, index) => (
                <div className="flex flex-col items-center pr-10 w-96 " key={index}>
                  <img
                    src="https://talkjs.com/resources/content/images/wordpress/2021/04/th2.png"
                    className="h-14 w-80"
                  />
                  <input
                    type="radio"
                    name="subheader-4"
                    className="radio !radio-accent mt-2"
                    checked={themeInfo.customize?.subheader == index + 1}
                    onChange={(e) => handleChange("subheader", index + 1)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold">Message</h3>
        <div className="p-4">
          <div className="flex overflow-x-scroll w-full ">
            {Array(3)
              .fill(0)
              .map((event, index) => (
                <div className="flex flex-col items-center pr-10 w-96 " key={index}>
                  <img
                    src="https://talkjs.com/resources/content/images/wordpress/2021/04/th2.png"
                    className="h-14 w-80"
                  />
                  <input
                    type="radio"
                    name="message-4"
                    className="radio !radio-accent mt-2"
                    checked={themeInfo.customize?.message == index + 1}
                    onChange={(e) => handleChange("message", index + 1)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="my-3">
        <h3 className="font-bold">Quick Reaction</h3>
        <div className="flex items-center">
          <span>Hide</span>
          <input type="checkbox" className="toggle my-3 mx-3" checked={themeInfo.customize?.quickReaction}
          onChange={(val) => {
            setthemeInfo((prev) => {
                let newData = {
                  ...prev,
                  customize: {
                    ...prev?.customize,
                    quickReaction: val.target.checked,
                  },
                };
                //   dispatch(
                //     setPreviewDataInfo({
                //       type: "/chat/list",
                //       data: newData,
                //     })
                //   );
                return newData;
              });
          }}
          />
          <span>Show</span>
        </div>
      </div>

      <div className="flex mt-10">
          <button
            onClick={applyAll}
            disabled={isPending}
            className="bg-activePrimaryBgColor text-localColor px-4 py-2 rounded-lg"
          >
            {isPending ? "Submitting..." : "Save Changes"}
          </button>
        </div>

    </div>
  );
}

export default page;
