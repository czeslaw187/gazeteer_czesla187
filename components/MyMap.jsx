import { MapContainer, TileLayer, Marker, Popup, GeoJSON, LayersControl } from "react-leaflet";
import * as L from 'leaflet'
import {useState} from 'react'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

function MyMap({latLng, coords}) {
  const [mymap,setMymap] = useState(null)
  const [sideMenu,setSideMenu] = useState(false)
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
      <LayersControl.Overlay>
        <div className={sideMenu == true ? 
                        "max-w-full md:max-w-xl transition-slider relative top-14 h-full bg-sky-200 z-[9999] border-2 border-gray-800 rounded-sm px-1 overflow-x-auto" : 
                        "max-w-0 transition-slider absolute h-full top-14 z-[9999] border-2 border-gray-800 rounded-sm px-0 overflow-x-auto"}>
          <button className="w-[15] h-auto text-lg py-3 pl-3 font-bold relative float-right underline text-blue-600" onClick={()=>{setSideMenu(!sideMenu)}} >{"<<"}</button>       
          <h1 className="text-2xl mt-7 mb-5 text-center">{country.countryData?.data?.name}</h1>
          <hr/>
          <img src={country.countryData?.data?.flag} alt="flag" className="mr-auto ml-5 border-2 border-gray-900 w-6/12 h-auto" /> 
          <hr/>
          <p className="text-lg font-bold mx-6 my-5">Capital: {country.countryData?.data?.capital}</p>  
          <hr/>
          <p className="text-lg font-bold mx-6 my-5">Population: {country.countryData?.data?.population}</p>  
          <hr/>
        </div>
        <button className="border-gray-900 border-2 z-[9998] rounded-md p-3 h-[20] absolute top-20 left-2 font-bold text-lg text-left bg-white" onClick={()=>{setSideMenu(!sideMenu)}}>{">>"}</button>
      </LayersControl.Overlay>
    </MapContainer>
  );
};

export default MyMap;