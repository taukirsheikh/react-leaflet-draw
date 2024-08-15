import React, { useEffect, useRef, useState } from 'react';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

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

  useEffect(() => {
    const map = mapRef.current;

    if (!map) return;

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
      },
      draw: {
        polygon: true,
        polyline: true,
        rectangle: true,
        circle: true,
        marker: true,
      },
    });

    if (isDrawing) {
      map.addControl(drawControl);
    } else {
      map.removeControl(drawControl);
    }

    map.on(L.Draw.Event.CREATED, (event) => {
      const layer = event.layer;
      drawnItems.addLayer(layer);

      // Save the shape data
      const shapeData = layer.toGeoJSON();
      setDrawnShapes((prevShapes) => [...prevShapes, shapeData]);
    });

    return () => {
      map.off(L.Draw.Event.CREATED);
    };
  }, [isDrawing]);

  const handleDrawClick = () => {
    setIsDrawing(!isDrawing);
  };

  return (
    <>
      <div>Leaflet</div>
      <button onClick={handleDrawClick}>
        {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
      </button>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100%' }}
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
      </MapContainer>

      <div>
        <h2>Saved Shapes:</h2>
        <pre>{JSON.stringify(drawnShapes, null, 2)}</pre>
      </div>
    </>
  );
};

export default Leaflet;
