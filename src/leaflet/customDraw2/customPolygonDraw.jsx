import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import 'leaflet-draw';

const CustomDrawSecond = () => {
  const mapRef = useRef(null);
  const drawnItems = useRef(new L.FeatureGroup());

  useEffect(() => {
    const map = mapRef.current;

    if (!map) return;

    map.addLayer(drawnItems.current);

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems.current,
      },
      draw: {
        polygon: true,
        circle: false,
        circlemarker: false,
        marker: false,
        polyline: false,
        rectangle: false,
      },
    });
    drawControl.enable();
    map.addControl(drawControl);
    

    map.on(L.Draw.Event.CREATED, (e) => {
      const { layer } = e;
      drawnItems.current.addLayer(layer);
    });
  }, []);

  const handleDrawPolygon = () => {
    const map = mapRef.current;
    if (!map) return;

    // Programmatically trigger polygon draw
    const drawPolygon = new L.Draw.Polygon(map, {
      allowIntersection: false,
      showArea: true,
    });
    drawPolygon.enable();
  };

  const handleCancelDrawing = () => {
    const map = mapRef.current;
    if (!map) return;

    // Disable drawing and clear the drawn items
    map.eachLayer((layer) => {
      if (layer instanceof L.Polygon) {
        map.removeLayer(layer);
      }
    });
    drawnItems.current.clearLayers();
  };

  const handleSavePolygon = () => {
    // Here you can handle saving the drawn polygon, e.g., sending it to an API
    const layers = drawnItems.current.getLayers();
    if (layers.length > 0) {
      const layer = layers[0];
      const geoJson = layer.toGeoJSON();
      console.log('Saved Polygon:', geoJson);
    }
  };

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
      </MapContainer>
      <button onClick={handleDrawPolygon}>Draw Polygon</button>
      <button onClick={handleCancelDrawing}>Cancel</button>
      <button onClick={handleSavePolygon}>Save</button>
    </div>
  );
};

export default CustomDrawSecond;
