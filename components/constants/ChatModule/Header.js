import { FaUserAlt } from "react-icons/fa";
import { IoChatbubbleSharp } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";

export const Customheader = {
  1: (
    <div class="flex justify-between items-center p-1 px-1.5 bg-activePrimaryBgColor text-localColor">
      <RiMenu2Line class="w-4 h-4" />
      <h1 className="text-sm font-bold">Chat</h1>
      <div class="flex items-center">
        <div class="flex items-center">
          <span className="px-1 text-sm">3</span>
          <FaUserAlt class="w-3 h-3 mr-2" />
        </div>
      </div>
    </div>
  ),
  2: (
    <div class="flex justify-between items-center p-1 px-1.5 bg-activePrimaryBgColor text-localColor">
      <div className="w-10"></div>
      <h1 className="text-sm font-bold">Chat</h1>
      <div class="flex items-center">
        <div class="flex items-center">
          <span className="px-1 text-sm">3</span>
          <FaUserAlt class="w-3 h-3 mr-2" />
        </div>
        <RiMenu2Line class="w-4 h-4" />
      </div>
    </div>
  ),
  3: (
    <div class="flex justify-between items-center p-1 px-1.5 bg-activePrimaryBgColor text-localColor">
      <div class="flex items-center">
        <RiMenu2Line class="w-4 h-4 mr-1" />
        <div class="flex items-center">
          <IoChatbubbleSharp class="w-4 h-4 mr-1 bg-localColor text-activePrimaryBgColor p-0.5 rounded-md" />
          <h1 className="text-sm font-bold">Chat</h1>
        </div>
      </div>
      <div class="flex items-center">
        <div class="flex items-center">
          <span className="px-1 text-sm">3</span>
          <FaUserAlt class="w-3 h-3 mr-2" />
        </div>
      </div>
    </div>
  ),
};
