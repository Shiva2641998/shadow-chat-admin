import { FaChevronDown } from "react-icons/fa6";
import { IoIosPause } from "react-icons/io";
import { IoGameController } from "react-icons/io5";
import { RiHashtag } from "react-icons/ri";

export const CustomSubheader = {
  1: (
    <div className="flex flex-col p-1">
      <div className="header flex justify-end items-center rounded-md mb-1 z-10">
        <IoIosPause className="mx-1 text-xl rounded-lg px-1  p-1 bg-activePrimaryBgColor text-localColor" />
        <RiHashtag className="mx-1 text-xl rounded-lg px-1  p-1 bg-activePrimaryBgColor text-localColor" />
        <IoGameController className="mx-1 text-xl rounded-lg px-1  p-1 bg-activePrimaryBgColor text-localColor" />
      </div>
      <div className="header flex justify-end items-center px-1.5 py-1 rounded-md mb-1 z-10 bg-activePrimaryBgColor text-localColor">
        <p className="flex-1 text-xs">Room</p>
        <FaChevronDown className="text-xs" />
      </div>
    </div>
  ),
  2: (
    <div className="flex flex-col p-1">
      <div className="header flex justify-end items-center px-1.5 py-1 rounded-md mb-1 z-10 bg-activePrimaryBgColor text-localColor">
        <p className="flex-1 text-xs">Room</p>
        <FaChevronDown className="text-xs" />
      </div>

      <div className="header flex items-center rounded-md mb-1 z-10">
        <IoIosPause className="mx-1 text-xl rounded-lg px-1  p-1 bg-activePrimaryBgColor text-localColor" />
        <RiHashtag className="mx-1 text-xl rounded-lg px-1  p-1 bg-activePrimaryBgColor text-localColor" />
        <div className="flex-1"></div>
        <IoGameController className="mx-1 text-xl rounded-lg px-1  p-1 bg-activePrimaryBgColor text-localColor" />
      </div>
    </div>
  ),
  3: (
    <div className="flex p-1">
      <div className="header flex justify-end items-center px-1.5 py-1 rounded-md mb-1 z-10 bg-activePrimaryBgColor text-localColor w-full mr-1">
        <p className="flex-1 text-xs">Room</p>
        <FaChevronDown className="text-xs" />
      </div>

      <div className="header flex items-center rounded-md mb-1 z-10 bg-activePrimaryBgColor text-localColor">
        <IoIosPause className="mx-1 text-xl rounded-lg px-1  p-1 " />
      </div>
    </div>
  ),
};
