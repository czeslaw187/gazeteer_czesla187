import {useState,useEffect} from "react";
import dynamic from "next/dynamic";
import {connect} from 'react-redux';
import * as actionCreator from '../lib/actions.js';

function Home(props) {  
  const [coordinates,setCoordinates] = useState([]) 
  const MapWithNoSSR = dynamic(() => import("../components/MyMap"), {
    ssr: false
  });
  let storeData = props.state ? props.state.mapData : false

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position=>{
      setCoordinates([position.coords.latitude,position.coords.longitude]) 
    })
    props.loadCountries()
  },[props])

  useEffect(()=>{
    if (coordinates.length > 0) {
      props.loadCoords(coordinates)
    }
  },[coordinates])

  useEffect(()=>{
    if (storeData) {
      props.loadPoly(storeData[0].data)
      props.loadInfo(storeData[0].data)
    }
  },[storeData[0]])
  
  return (
    <main>
      <div id="map" className="w-screen h-screen">
        <MapWithNoSSR key="mymap" latLng={coordinates} coords={props}/>
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
    loadPoly: (country)=>{dispatch(actionCreator.getBorders(country))},
    loadCountries: ()=>{dispatch(actionCreator.getCountries())},
    loadInfo: (country)=>{dispatch(actionCreator.getInfo(country))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);