// MapWithCustomPolygonButton.js
import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import PolygonDrawer from './PolygonDrawer';
import CustomPolygonButton from './CustomPolygonDrawButton';
import 'leaflet/dist/leaflet.css';

const MapWithCustomPolygonButton = () => {
  const [enableDraw, setEnableDraw] = useState(false);
  const mapRef = useRef(null);

  const handlePolygonButtonClick = () => {
    setEnableDraw(true); // Enable drawing mode when the button is clicked
  };

  return (
    <div style={{ position: 'relative', height: '50rem', width: '100%' }}>
      <p><strong>Leaflet MAP 2</strong></p>
      <MapContainer scrollWheelZoom={false} center={[51.505, -0.09]} zoom={13} style={{ height: "100%", width: "100%" }} whenCreated={(map) => {
        mapRef.current = map;
      }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <PolygonDrawer enableDraw={enableDraw} setEnableDraw={setEnableDraw} />
        <CustomPolygonButton position="topright" onClick={handlePolygonButtonClick}  />
      </MapContainer>
      <br/>
    </div>
  );
};

export default MapWithCustomPolygonButton;
