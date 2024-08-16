import { useMap } from "react-leaflet";
import { useEffect } from "react";
const PolygonDrawer = () => {
    const map = useMap();
  
    useEffect(() => {
      // Create a feature group to store editable layers
      const drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
  
      // Set up the Leaflet draw control and pass it the FeatureGroup of editable layers
      const drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems,
          remove:false,
          edit:false,
        },
        draw: {
          polygon: true,    // Enable polygon drawing
          rectangle: false, // Disable rectangle drawing
          circle: false,    // Disable circle drawing
          polyline: false,  // Disable polyline drawing
          marker: false,    // Disable marker drawing
          circlemarker: false, // Disable circle marker drawing
        }
      });
  
      map.addControl(drawControl);
  
      // Handle the creation of a new polygon
      map.on(L.Draw.Event.CREATED, function (event) {
        const layer = event.layer;
        drawnItems.addLayer(layer);
        console.log('Polygon Coordinates:', layer.getLatLngs());
      });
  
      return () => {
        map.removeControl(drawControl);
      };
    }, [map]);
  
    return null
  };

  export default PolygonDrawer;

  const CustomPolygonButton = ({ onClick }) => {
    return (
      <button onClick={onClick} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}>
        Polygon
      </button>
    );
  };