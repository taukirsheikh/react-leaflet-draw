// PolygonDrawer.js
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const PolygonDrawer = ({ enableDraw, setEnableDraw }) => {
  const map = useMap();

  useEffect(() => {
    if (!enableDraw) return;

    // Initialize draw control without adding it to the map
    const drawControl = new L.Draw.Polygon(map, {
      allowIntersection: true, // Restrict shapes to simple polygons
      showArea: true,
      drawError: {
        color: '#e1e100', // Color the shape's error
        timeout: 1000,
      },
      shapeOptions: {
        color: 'blue',
      },
    });

    // Activate drawing mode
    drawControl.enable();

    // Listen for when the drawing is finished
    map.on(L.Draw.Event.CREATED, function (event) {
      const layer = event.layer;
      map.addLayer(layer);
      console.log('Polygon Coordinates:', layer.getLatLngs());

      // Disable drawing mode once the polygon is drawn
      drawControl.disable();
      setEnableDraw(false); // Reset the drawing state
    });

    // Clean up when the component is unmounted or re-rendered
    return () => {
      drawControl.disable(); // Ensure drawing mode is disabled
    };
  }, [enableDraw, map, setEnableDraw]); // Re-run effect when enableDraw changes

  return null;
};

export default PolygonDrawer;
