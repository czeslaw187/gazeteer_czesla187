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
  },[])

  useEffect(()=>{
    if (coordinates.length > 0) {
      props.loadCoords(coordinates)
    }
  },[coordinates])

  useEffect(()=>{
    if (storeData) {
      props.loadPoly(storeData[0].data)
    }
  },[storeData[0]])
  console.log(props.state, 'index')
  return (
    <main>
      <div id="map" className="w-screen h-screen">
        <MapWithNoSSR latLng={coordinates} coords={props}/>
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
    loadCountries: ()=>{dispatch(actionCreator.getCountries())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);