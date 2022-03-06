import { MapContainer, TileLayer, Marker, Popup, Polygon, GeoJSON } from "react-leaflet";
import {useState, useEffect} from 'react'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

function MyMap({latLng, coords}) {
  const [mymap,setMymap] = useState(null)
  let country = coords ? coords.state : 'Loading...'
  console.log(coords, 'map')
  return (
    <MapContainer
      center={latLng ? latLng : [30,20]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      whenCreated={map=>setMymap(map)}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
        attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
      />    
      {country && country.polygon.length > 0 ? <GeoJSON data={country.polygon[0].data.geometry}/> : null}
      <Marker 
      position={latLng ? latLng : [30,20]}
      draggable={true}
      animate={true}
      >
        <Popup>
          <p>{country?.mapData[0]?.data}</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;

// <Polygon positions={country.polygon[0].data} />