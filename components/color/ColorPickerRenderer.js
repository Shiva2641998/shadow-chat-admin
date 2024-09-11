// ColorPickerRenderer.jsx
import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";

const ColorPickerRenderer = (props) => {
  const pickerRef = useRef(null);
  const [color, setColor] = useState(props.value || "#ffffff");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

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

  const handleChange = (color) => {
    setColor(color.hex);
    props.node?.setDataValue(props.column.colId, color.hex);
    props.api?.stopEditing();
  };

  return (
    <div
      className="flex justify-center items-center "
      style={{
        padding: "5px",
        display: "flex",
        alignItems: "center"
      }}
    >
      {displayColorPicker ? (
        <div
          ref={pickerRef}
         
        >
          <SketchPicker
            color={color}
            onChange={handleChange}
            style={{ position: "absolute", zIndex: 1000 }}
          />
        </div>
      ) : (
        <div className={`border-2 border-gray-200 rounded-md w-14 h-8 p-1 flex justify-center items-center`}>
          <span
            className={`w-full h-full`}
            style={{ backgroundColor: color }}
            onClick={() => setDisplayColorPicker(!displayColorPicker)}
          ></span>
        </div>
      )}

      {/* <div
        style={{
          width: '100%',
          height: '100%',
          background: color,
          cursor: 'pointer',
        }}
        
      /> */}
    </div>
  );
};

export default ColorPickerRenderer;
