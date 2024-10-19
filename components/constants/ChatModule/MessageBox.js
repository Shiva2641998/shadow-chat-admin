import { MdReport } from "react-icons/md";
import { FaReply } from "react-icons/fa";

const imgURL =
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

export const CustomMessageBox = {
  1: (
    <div className="flex items-end mb-2 chat chat-start">
      <img src={imgURL} className="w-5 h-5 rounded-full" />
      <div className="chat-bubble !bg-activePrimaryBgColor !text-localColor">
        <span style={{ fontSize: 10 }}>this is a Message</span>
      </div>
    </div>
  ),
  2: (
    <div className="flex items-end mb-2">
      <img src={imgURL} className="w-5 h-5 mr-1 rounded-full" />
      <div className="w-full">
        <div className="flex items-center">
          <h2 className="text-activePrimaryBgColor text-xs font-bold">Title</h2>
          <div className="flex-1"></div>
          <div className="flex items-center">
            <MdReport class="w-3 h-3 mr-2 text-activePrimaryBgColor" />
            <FaReply class="w-3 h-3 mr-2 text-activePrimaryBgColor" />
          </div>
        </div>
        <div className=" !bg-activePrimaryBgColor !text-localColor p-1 rounded-md flex">
          <span style={{ fontSize: 10 }}>this is a Message</span>
        </div>
      </div>
    </div>
  ),
  3: (
    <div className="flex items-start mb-2 bg-activePrimaryBgColor rounded-md p-1">
      <img src={imgURL} className="w-5 h-5 mr-1 rounded-full" />
      <div className="w-full">
        <div className="flex items-center">
          <h2 className="text-localColor text-xs font-bold">Title</h2>
          <div className="flex-1"></div>
          <div className="flex items-center">
            <MdReport class="w-3 h-3 mr-2 text-localColor" />
            <FaReply class="w-3 h-3 mr-2 text-localColor" />
          </div>
        </div>
        <div className=" !text-localColor ">
          <span style={{ fontSize: 10 }}>this is a Message</span>
        </div>
      </div>
    </div>
  ),
};
