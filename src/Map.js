import React from "react"
import { MapContainer as LeafletMap, TileLayer, useMap,MapContainer } from "react-leaflet";
import "./Map.css"
import {showDataOnMap} from "./util"


function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map({countries,casesType,center,zoom}) {

  return (
    <div className="map">
   <MapContainer center={center} zoom={zoom}>
   <ChangeView center={center} zoom={zoom} />
   <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
           <ChangeView center={center} zoom={zoom} /> 
        {showDataOnMap(countries,casesType)}
   </MapContainer>

    </div>
  );
}

export default Map 