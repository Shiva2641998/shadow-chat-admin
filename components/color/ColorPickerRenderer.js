// ColorPickerRenderer.jsx
import React, { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';

const ColorPickerRenderer = (props) => {
  const pickerRef = useRef(null);
  const [color, setColor] = useState(props.value || '#ffffff');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setDisplayColorPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (color) => {
    setColor(color.hex);
    setDisplayColorPicker(false)
    props.node.setDataValue(props.column.colId, color.hex);
  };

  return (
    <div className='flex ' style={{
      padding: '5px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative', // Ensure it's positioned relatively
      zIndex: 1000, // Set a high z-index value
    }}>
      {
        displayColorPicker ?  <div ref={pickerRef} style={{
          position: 'absolute', // Position the color picker absolutely
          zIndex: 1000, // Ensure it appears on top
          top: '100%', // Position it below the container
          left: 0, // Align it with the left edge
        }}>
        <SketchPicker color={color} onChange={handleChange} style={{ position: 'absolute', zIndex: 1000 }}/>
      </div> : <span onClick={() => setDisplayColorPicker(!displayColorPicker)}>{color}</span> 
      }

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
