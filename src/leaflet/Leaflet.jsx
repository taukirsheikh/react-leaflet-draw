import React from 'react'
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, useMap ,Marker,Popup} from 'react-leaflet'


const Leaflet = () => {
  return (
    <>
      <div>Leaflet</div>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}  style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  )
}

export default Leaflet