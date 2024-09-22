"use client";
import React, { useEffect, useState } from "react";

function page() {
  const [bubbleView, setbubbleView] = useState(false);
  return (
    <div className="flex items-start w-full h-[100%] pt-6 z-10 relative">
      {/* <div className="w-[30%]">
        <label className="swap w-full bg-activePrimaryBgColor text-localColor px-4 py-3 rounded-lg">
          <input type="checkbox" onClick={() => setbubbleView(!bubbleView)} />
          <div className="swap-on">bubble ON</div>
          <div className="swap-off">bubble OFF</div>
        </label>
      </div> */}

      {/* <div className="divider divider-horizontal"></div> */}
      <div className=" w-full h-full rounded-lg overflow-hidden">
        <saytv-chat
          // bubble={bubbleView}
          authentication="true"
        ></saytv-chat>
      </div>
    </div>
  );
}

export default page;
