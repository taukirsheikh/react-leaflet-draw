import React from 'react';

const CustomPolygonDrawButton = ({ onClick, position }) => {
  const style = position === 'topright' ? topright : null;
  return (
    <button onClick={onClick} style={style}>
      Draw Polygon
    </button>
  );
};

export default CustomPolygonDrawButton;

let topright= {
  position: 'absolute',
  top: '2rem',  // Align to the top
  right: '2rem',  // Align to the right
  padding: '1rem 2rem',
  backgroundColor: 'green',
  color: 'white',
  borderRadius: '5px',
  zIndex: '1000',
  cursor: 'pointer'
}