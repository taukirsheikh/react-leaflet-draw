import React, { useEffect, useRef, useState } from 'react';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { MapContainer, TileLayer, Marker, Popup, Polygon, FeatureGroup, useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet-draw';
import LeafletDraw from './Draw/LeafletDraw';
import PolygonDrawer from './Draw/polygonDrawCustom';

const Leaflet = () => {
  const mapRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnShapes, setDrawnShapes] = useState([]);

  // Define the coordinates for the polygon
  const polygonCoordinates = [
    [51.51, -0.1],
    [51.51, -0.12],
    [51.505, -0.13],
    [51.5, -0.12],
    [51.5, -0.1],
  ];



  const handleDrawClick = () => {
    setIsDrawing(!isDrawing);
  };

  return (
    <>
      <div>
        <strong>
          Leaflet MAP 1
        </strong>
      </div>
      <button onClick={handleDrawClick}>
        {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
      </button>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '80vh', width: '100%' }}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Polygon positions={polygonCoordinates} color="purple" />
        <div className='leaflet-draw'>

          <LeafletDraw drawnShapes={drawnShapes} setDrawnShapes={setDrawnShapes} />
        </div>
        <PolygonDrawer />
      </MapContainer>

      <div>
        <h2>Saved Shapes:</h2>
        <pre>{JSON.stringify(drawnShapes, null, 2)}</pre>
      </div>
    </>
  );
};

export default Leaflet;
