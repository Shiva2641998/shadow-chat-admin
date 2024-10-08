import React, { useEffect, useLayoutEffect } from "react";
import Header from "../components/AppBar/Header";
import Image from "next/image";
import { useState } from "react";
import cellPhone from "./cell.webp";
import Sidebar from "../components/AppBar/Sidebar";
import Signin from "../components/Signin/Signin";
import PreviewComponent from "..//components/Preview/PreviewComponent";
import { useAppSelector } from "../store/store";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
// import 'shadow-chatbox'

function Childlayout({ children }) {
  const [sidebarShow, setsidebarShow] = useState(true);
  const { preview } = useAppSelector((state) => state.theme);
  const [showChat, setshowChat] = useState(false)
  const accessToken = useSelector((state) => state.theme.access_token);

  const sidebarHandle = () => {
    setsidebarShow(!sidebarShow);
  };

  useLayoutEffect(() => {
    // Import the shadow-chatbox only after the component mounts
    if(accessToken){
      import('shadow-chatbox');
    }
  }, [accessToken]);

  // const scriptId = "saytv-chat-script";

  // useEffect(() => {
  //   let found = document.getElementById(scriptId);
  //   if(!found){

  //   const addScript = () => {
  //     const script = document.createElement("script");
  //     script.src =
  //       "https://shiva2641998.github.io/shadow-chat-bundle/shadow-chat.js";
  //     script.type = "module";
  //     script.id = scriptId;

  //     // Once script loads, create the custom element
  //     script.onload = () => {};

  //     document.body.appendChild(script);
  //   };
  //   // addScript();
  // }


  // }, [accessToken]);

  return (
    <div className="flex h-screen bg-slate-100">
      <ToastContainer position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      {/* <div
        // className={`transition-all w-0 p-0`}
      > */}
        {/* <Sidebar /> */}
      {/* </div> */}
      {!accessToken ? <Signin /> : (
      <>
      <div className="h-full transition-all" style={{
        width: showChat ? '75%' : '100%'
      }}>
        <Header sidebarClick={sidebarHandle} open={sidebarShow} showChat={showChat} setshowChat={setshowChat} />
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
            className={`flex justify-center items-center z-0 ${
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
      <div className="" style={{
        width: showChat ? "25%" : "",
        margin: showChat ? "0px 10px" : ""
      }}>
       {accessToken && <saytv-chat bubble={showChat ? "false" : "true"} width={showChat ? "100" : "30"} height="100" authentication="false" accessToken={accessToken}></saytv-chat>}
      </div> 
      <div>
      {/* <saytv-chat bubble="true" width="30" height="100" authentication="true"></saytv-chat> */}
      </div>
      </>
     )} 
    </div>
  );
}

export default Childlayout;
