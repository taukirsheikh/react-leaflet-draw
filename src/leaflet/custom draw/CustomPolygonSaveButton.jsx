import React, { useState } from 'react';

const CustomPolygonSaveButton = ({ onCancelButtonClick, onEditButtonClick, onSaveButtonClick }) => {
  // Inline styles for the button container and buttons
  const containerStyle = {
    position: 'absolute',
    padding: '1rem',
    top: '8rem',
    right: '3rem',
    zIndex: 1000,
    display: 'flex',
    gap: '1rem', // Space between buttons
    backgroundColor: 'white',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545', // Different color for cancel button
  };

  // State to track which button is active
  const [activeButton, setActiveButton] = useState(null);

  // Styles for the active state
  const activeButtonStyle = {
    transform: 'scale(0.95)', // Slightly smaller to indicate it's pressed
  };

  return (
    <div style={containerStyle}>
      <button
        onClick={onCancelButtonClick}
        style={{
          ...cancelButtonStyle,
          ...(activeButton === 'cancel' && activeButtonStyle),
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#c82333')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#dc3545')}
        onMouseDown={() => setActiveButton('cancel')}
        onMouseUp={() => setActiveButton(null)}
      >
        Cancel
      </button>
      <button
        style={{
          ...buttonStyle,
          ...(activeButton === 'save' && activeButtonStyle),
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
        onMouseDown={() => setActiveButton('save')}
        onMouseUp={() => setActiveButton(null)}
        onClick={onSaveButtonClick}
      >
        Save
      </button>
      <button
        
        onClick={onEditButtonClick}
      >
        Edit
      </button>
    </div>
  );
};

export default CustomPolygonSaveButton;
