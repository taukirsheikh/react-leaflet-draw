import React from 'react'
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import './LeafletDraw.css'; // Import your custom CSS file

const LeafletDraw = ({ setDrawnShapes, drawnShapes }) => {
 

  return (  
    <>
    <FeatureGroup>
      <EditControl
      className={{background: 'white', padding: '4rem'}}
        position="topright"
        draw={{
          circle: false,
          circlemarker: false,
          marker: false,
          polyline: false,
          rectangle: false,
          polygon: {
            showArea: true
          }
        }}
        edit={{
          // featureGroup:editableLayers,
          // edit:true,
          remove:true
        }}
        
        onCreated={(e) => {
          const { layerType, layer } = e;
          if (layerType === 'polygon') {
            setDrawnShapes([...drawnShapes, layer.toGeoJSON()]);
          }
        }}
        
        
      />
    </FeatureGroup>
    </>
  )
}

export default LeafletDraw;


