// ColorPickerRenderer.jsx
import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";

const ColorPickerRenderer = ({ params, setRowData, handleProcessRowUpdate }) => {
  const pickerRef = useRef(null);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(params.value);

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
    handleProcessRowUpdate(params,color.hex)
    // params.api.setEditCellValue({
    //   id: params.id,
    //   field: params.field,
    //   value: color.hex,
    // });
    // // Notify the grid about the cell edit
    // params.api.commitCellChange({ id: params.id, field: params.field });
  };

  return (
    <div className="flex justify-center items-center h-full" style={{ position: "relative" }}>
    {displayColorPicker ? (
    <div ref={pickerRef} className="z-50">
        <SketchPicker
        className="z-50"
          color={color}
          onChangeComplete={handleChangeComplete}
          disableAlpha
          />
      </div>
      ) : (
        <div
          className={`border-2 border-gray-200 rounded-md w-14 h-8 p-1 z-10 flex justify-center items-center`}
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
};

export default ColorPickerRenderer;
