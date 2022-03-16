import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import * as L from 'leaflet'
import {useState} from 'react'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

function MyMap({latLng, coords}) {
  const [mymap,setMymap] = useState(null)
  let country = coords ? coords : 'Loading...'
  if (!country) {
    return <div>Loading...</div>
  }
  console.log(country, 'map')

  const LeafIcon = L.Icon.extend({
    options: {}
  });
  const blueIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
  })
  const greenIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
  });
  let bbox = country.countryData?.data?.bbox
  let center = country.countryData?.data?.capitalInfo
  if (bbox) {
    bbox = bbox.map(el=>parseInt(el))
    bbox = [[bbox[0],bbox[2]],[bbox[1],bbox[3]]]
  }
  console.log(bbox, 'map')
  return (
    <MapContainer
      bounds={bbox}      
      center={center}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      whenCreated={map=>setMymap(map)}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
        attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
      />    
      {country ? <GeoJSON data={country.polygon?.data}/> : null}
      {
        country.countryData?.data?.majorCities.map((el,id)=>{
          return (
            <Marker
              key={id}
              position={[el.latitude,el.longitude]}
              draggable={true}
              animate={true}
              icon={country.countryData.data.capital == el.name ? greenIcon : blueIcon}
            >
              <Popup>
                <p className="text-lg">{el.name}</p>
                <p>Population: {el.population}</p>
              </Popup>
            </Marker>
          )
        })
      }
    </MapContainer>
  );
};

export default MyMap;