import {useState,useEffect} from "react";
import dynamic from "next/dynamic";
import {connect} from 'react-redux';
import * as actionCreator from '../lib/actions.js';

function Home({state, loadCountries, loadCoords, loadInfo}) {  
  const [coordinates,setCoordinates] = useState([]) 
  const [loading,setLoading] = useState(false)

  let storeData = state ? state.mapData : false
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position=>{
      setCoordinates([position.coords.latitude,position.coords.longitude]) 
    })
  },[])

  useEffect(()=>{
    if (coordinates.length > 0) {
      loadCoords(coordinates)
    }
  },[coordinates])

  useEffect(()=>{
    if (storeData) {
      setLoading(false)
      loadInfo(storeData[0].data)
      setLoading(true)
    }
  },[storeData[0]])

  const MapWithNoSSR = dynamic(() => import("../components/MyMap"), {
    ssr: false
  });
  if (!loading) return <div className="text-xl text-center w-full bg-white relative top-40 z-[10000]">Loading ...</div>
  return (
    <main>
      <div id="map" className="w-screen h-screen">
        <MapWithNoSSR key="mymap" latLng={coordinates} coords={state}/>
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCoords: (coords)=>{dispatch(actionCreator.loadGeoJson(coords))},
    loadInfo: (country)=>{dispatch(actionCreator.getInfo(country))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);