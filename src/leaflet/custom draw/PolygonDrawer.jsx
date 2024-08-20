// PolygonDrawer.js
import { useCallback, useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const PolygonDrawer = ({
  enableDraw,
  setEnableDraw,
  drawnShapes,
  setDrawnShapes,
  cancelDraw,
  editDraw,
  saveDraw,
}) => {
  const map = useMap();
  const currentLayer = useRef(null); // Use a ref to track the current layer
  const drawControlRef = useRef(null); // Store the reference to the draw control
  const featureGroup = useRef(L.featureGroup().addTo(map)); // Feature group to manage layers
  const editControlRef = useRef(null); // Store the reference to the edit control

  // Define the drawPolygon function using useCallback
  const drawPolygon = useCallback(() => {
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
        stroke: true,
        weight: 3,
        lineCap: 'round',
        lineJoin: 'round',
      },
    });

    drawControlRef.current = drawControl;

    // Activate drawing mode
    drawControl.enable();

    // Listen for when the drawing is finished
    const onDrawCreated = (event) => {
      const layer = event.layer;
      featureGroup.current.addLayer(layer); // Add layer to the feature group
      setDrawnShapes([...drawnShapes, layer.toGeoJSON()]);
      map.addLayer(layer);
      console.log('Polygon Coordinates:', layer.getLatLngs());

      currentLayer.current = layer; // Store the reference to the current layer

      // Disable drawing mode once the polygon is drawn
      drawControl.disable();
      setEnableDraw(false); // Reset the drawing state

      // Remove the event listener after drawing
      map.off(L.Draw.Event.CREATED, onDrawCreated);
    };

    map.on(L.Draw.Event.CREATED, onDrawCreated);

    // Clean up function for disabling drawing mode
    return () => {
      drawControl.disable();
      map.off(L.Draw.Event.CREATED, onDrawCreated);
    };
  }, [map, setEnableDraw, drawnShapes, setDrawnShapes]);

  // Trigger drawPolygon if enableDraw is true
  useEffect(() => {
    if (enableDraw) {
      drawPolygon();
    }
  }, [enableDraw, drawPolygon]);

  // Clear the drawn shape if cancelDraw is true
  useEffect(() => {
    if (cancelDraw) {
      if (drawControlRef.current) {
        drawControlRef.current.disable(); // Disable drawing mode
      }

      // If there's a shape currently being drawn, remove it
      if (currentLayer.current) {
        featureGroup.current.removeLayer(currentLayer.current);
        currentLayer.current = null;
      }

      // Reset drawn shapes state
      setDrawnShapes((prevShapes) => prevShapes.slice(0, -1));
    }
  }, [cancelDraw, setDrawnShapes]);

  // Enable edit mode if editDraw is true
  useEffect(() => {
    if (editDraw) {
      if (!editControlRef.current) {
        // Initialize edit control
        const editControl = new L.EditToolbar.Edit(map, {
          featureGroup: featureGroup.current,
        });
        editControlRef.current = editControl;
      }

      // Enable editing for the feature group
      editControlRef.current.enable();
    } else if (editControlRef.current) {
      // Disable editing mode if editDraw is false
      editControlRef.current.disable();
    }
  }, [editDraw, map]);

  // Save edited shapes when saveDraw is triggered
  useEffect(() => {
    if (saveDraw && editDraw) {
      const updatedShapes = [];

      featureGroup.current.eachLayer((layer) => {
        updatedShapes.push(layer.toGeoJSON());
      });

      setDrawnShapes(updatedShapes);
      console.log('Updated Shapes:', updatedShapes);
    }
  }, [saveDraw, editDraw, setDrawnShapes]);

  // Load and display saved drawn shapes on the map
  useEffect(() => {
    if (drawnShapes.length > 0) {
      // Clear the current layers
      featureGroup.current.clearLayers();

      // Add each shape to the map
      drawnShapes.forEach((shape) => {
        const layer = L.geoJSON(shape, {
          style: {
            color: 'blue',
            weight: 3,
          },
        }).addTo(map);
        featureGroup.current.addLayer(layer);
      });
    }
  }, [drawnShapes, map]);

  return null;
};

export default PolygonDrawer;
