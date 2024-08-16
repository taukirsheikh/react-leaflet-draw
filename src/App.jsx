import React from 'react'
import Leaflet from './leaflet/Leaflet'
import MapWithCustomPolygonButton from './leaflet/custom draw/MapWithCustomPolygonButton'
 const App = () => {
  return (
    <>
    <div>

      <Leaflet />
      <MapWithCustomPolygonButton/>
    </div>
    </>
  )
}

export default App
