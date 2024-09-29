"use client";
import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";

function ColorPick({className="", subclassName=""}) {
  const pickerRef = useRef(null);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState("transparent");
  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setDisplayColorPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle color change
  const handleChangeComplete = (color) => {
    setColor(color.hex);
    // handleProcessRowUpdate(params,color.hex)
  };
  
  return (
    <div
      className={` flex ${className}`}
      style={{ position: "relative" }}
    >
      {displayColorPicker ? (
        <div ref={pickerRef} className="z-50 absolute top-0 -left-9">
          <SketchPicker
            className="z-50"
            color={color}
            onChangeComplete={handleChangeComplete}
            disableAlpha
          />
        </div>
      ) : (
        <div
          className={`border-2 border-gray-200 rounded-md w-14 h-8 p-1 z-10 flex justify-center items-center ${subclassName}`}
        >
          <span
            className={`w-full h-full`}
            style={{ backgroundColor: color }}
            onClick={() => setDisplayColorPicker(!displayColorPicker)}
          ></span>
        </div>
      )}
    </div>
  );
}

export default ColorPick;
