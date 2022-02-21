import {useState,useEffect} from "react";
import dynamic from "next/dynamic";
import {connect} from 'react-redux'
import * as actionCreator from '../lib/actions.js'
import axios from 'axios'

function Home(props) {  
  const [coordinates,setCoordinates] = useState([])
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position=>{
      setCoordinates([position.coords.latitude,position.coords.longitude])
      props.loadCoords([position.coords.latitude,position.coords.longitude])
    })
  },[])
  
  console.log(props)
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

function mapStateToProps(state) {
  return {
    coords: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCoords: (coords)=>{dispatch(actionCreator.loadGeoJson(coords))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);