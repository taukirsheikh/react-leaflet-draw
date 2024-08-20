import React from 'react'
import Leaflet from './leaflet/Leaflet'
import MapWithCustomPolygonButton from './leaflet/custom draw/MapWithCustomPolygonButton'
import CustomDrawSecond from './leaflet/customDraw2/customPolygonDraw'
 const App = () => {
  return (
    <>
    <div>

      <Leaflet />
      <MapWithCustomPolygonButton/>
      {/* <CustomDrawSecond/> */}
    </div>
    </>
  )
}

export default App
