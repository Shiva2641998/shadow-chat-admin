import React from "react";
import Header from "../components/AppBar/Header";
import Image from "next/image";
import { useState } from "react";
import cellPhone from "./cell.webp";
import Sidebar from "../components/AppBar/Sidebar";
import PreviewComponent from "..//components/Preview/PreviewComponent";
import { useAppSelector } from "../store/store";

function Childlayout({ children }) {
  const [sidebarShow, setsidebarShow] = useState(true);
  const { preview } = useAppSelector((state) => state.theme);

  const sidebarHandle = () => {
    setsidebarShow(!sidebarShow);
  };
  return (
    <div className="flex h-screen bg-slate-100">
      {/* <div
        // className={`transition-all w-0 p-0`}
      > */}
        {/* <Sidebar /> */}
      {/* </div> */}
      <div className="w-full h-full">
        <Header sidebarClick={sidebarHandle} open={sidebarShow} />
        <div className="flex px-5 h-[80%]">
          <Sidebar />
          <div className={`
          ${
              preview ? "w-[80%]" : "w-[100%]"
            }
            transition-all
             mr-5`}>
              {children}
              </div>
          <div
            className={`flex justify-center items-center ${
              preview ? "w-[20%]" : "w-0"
            }
             h-full overflow-hidden`}
          >
            <div className="relative flex justify-center items-center ">
              <Image src={cellPhone} className="w-52 h-96" />
              <div className="p-2 absolute top-0 rounded-4xl h-full w-full overflow-hidden">
                <div className="h-full w-full rounded-3xl bg-white relative overflow-hidden">
                  <PreviewComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Childlayout;
