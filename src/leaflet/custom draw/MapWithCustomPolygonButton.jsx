// MapWithCustomPolygonButton.js
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import PolygonDrawer from './PolygonDrawer';
import CustomPolygonButton from './CustomPolygonDrawButton';
import 'leaflet/dist/leaflet.css';
import CustomPolygonSaveButton from './CustomPolygonSaveButton';

const MapWithCustomPolygonButton = () => {
  const [drawnShapes, setDrawnShapes] = useState([]);
  const [enableDraw, setEnableDraw] = useState(false);
  const [cancelDraw, setCancelDraw] = useState(false);
  const [editDraw, setEditDraw] = useState(false);
  const [saveDraw, setSaveDraw] = useState(false);
  const mapRef = useRef(null);

  const handlePolygonButtonClick = () => {    
    setEnableDraw(true); // Enable drawing mode when the button is clicked
    setCancelDraw(false); // Reset cancel state when initiating a new draw
  };

  const handleCancelButtonClick = () => {
    setEditDraw(true); // Trigger cancel of the last drawn polygon
  };

  const handleEditButtonClick = () => {
    setCancelDraw(true); 
  };
const handleSaveButtonClick = () => {
  setSaveDraw(true); // Trigger save
}
  useEffect(() => {
    if (cancelDraw) {
      console.log('Cancel draw triggered');
    }
  }, [cancelDraw]);

  return (
    <div style={{ position: 'relative', height: '50rem', width: '100%' }}>
      <p><strong>Leaflet MAP 2</strong></p>
      <MapContainer
        scrollWheelZoom={false}
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <PolygonDrawer
          enableDraw={enableDraw}
          setEnableDraw={setEnableDraw}
          setDrawnShapes={setDrawnShapes}
          drawnShapes={drawnShapes}
          cancelDraw={cancelDraw}
          editDraw={editDraw}
          saveDraw={saveDraw}
        />
        <CustomPolygonButton position="topright" onClick={handlePolygonButtonClick} />
        <CustomPolygonSaveButton onCancelButtonClick={handleCancelButtonClick} onEditButtonClick={handleEditButtonClick} onSaveButtonClick={handleSaveButtonClick}/>
      </MapContainer>
      <div>
        <h2>Saved Shapes:</h2>
        <pre>{JSON.stringify(drawnShapes, null, 2)}</pre>
      </div>
      <br />
    </div>
  );
};

export default MapWithCustomPolygonButton;
