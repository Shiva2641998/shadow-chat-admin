import React from "react";
import Routes from "../routes";

function Sidebar() {
  return (
    <div className="bg-primaryBgColor h-full shadow-lg border-r-2 px-2 py-2">
      <Routes />
    </div>
  );
}

export default Sidebar;
