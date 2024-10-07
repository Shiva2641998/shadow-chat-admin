import React from "react";
import ReactPlayer from "react-player";

function EmptyView() {
  return (
    <div className="bg-black h-full">
    <video
      src={'/videoempty.mp4'}
      className="w-full h-full"
      loop
      height={'100%'}
      autoPlay={true}
      />
      </div>
  );
}

export default EmptyView;
