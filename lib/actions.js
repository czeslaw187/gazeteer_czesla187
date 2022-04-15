import axios from 'axios'

export function loadGeoJson(mapData) {
    return(dispatch)=>{
        return axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/getGeoJson', {
            mapData: mapData
        })
        .then(data=>{dispatch({type:"ADD_ITEM", payload:data})})
    }
}

export function getInfo(country) {
    return(dispatch)=>{
        return axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/forwardGeo',{
            countryName: country
        })
        .then(data=>{dispatch({type:"ADD_INFO", payload:data})})
    }
}