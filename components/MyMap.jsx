import { MapContainer, TileLayer, Marker, Popup, GeoJSON, LayersControl } from "react-leaflet";
import * as L from 'leaflet'
import {useState} from 'react'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import Weather from './Weather.js'
import SideMenu from "./SideMenu.js";

function MyMap({latLng, coords}) {
  const [mymap,setMymap] = useState(null)
  const [sideMenu,setSideMenu] = useState(false)
  const [weather,setWeather] = useState(false)
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
  return (
    <MapContainer
      bounds={bbox}      
      center={center}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
      whenCreated={map=>setMymap(map)}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
        attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
      />    
      {country ? <GeoJSON data={country.polygon?.data}/> : null}
      {
        country.countryData?.data?.majorCities ? country.countryData?.data?.majorCities.map((el,id)=>{
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
        }) : ['No content']
      }
      <LayersControl.Overlay>
        <SideMenu country={country} sideMenu={sideMenu} setSideMenu={setSideMenu} />
        <div>
          <button className="border-gray-900 border-2 z-[9998] rounded-md p-3 h-14 absolute top-20 left-2 font-bold text-lg text-left bg-white" onClick={()=>{setSideMenu(!sideMenu)}}>{">>"}</button>
          <button className="absolute top-40 border-gray-900 rounded-md border-2 p-2 h-14 z-[9998] left-2 bg-white" onClick={()=>{setWeather(!weather)}}>
            <img className="w-auto max-h-8" src='freesun.jpg' alt="forecast" />
          </button>          
        </div>
        <Weather country={country} weather={weather} setWeather={setWeather} />
        </LayersControl.Overlay>
    </MapContainer>
  );
};

export default MyMap;