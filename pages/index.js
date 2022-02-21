import {useState,useEffect} from "react";
import dynamic from "next/dynamic";

function Home() {  
  const [coordinates,setCoordinates] = useState([])
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position=>setCoordinates([position.coords.latitude,position.coords.longitude]))
  },[])
  const MapWithNoSSR = dynamic(() => import("../components/MyMap"), {
    ssr: false
  });
  return (
    <main>
      <div id="map" className="w-screen h-screen">
        <MapWithNoSSR latLng={coordinates} />
      </div>
    </main>
  );
}
export default Home;