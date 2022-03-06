import axios from 'axios'

export function loadGeoJson(mapData) {
    return(dispatch)=>{
        return axios.post(process.env.NEXT_PUBLIC_URL + '/api/getGeoJson', {
            mapData: mapData
        })
        .then(data=>dispatch({type:"ADD_ITEM", payload:data}))
    }
}

export function getBorders(country_name) {
    return(dispatch)=>{
        return axios.post(process.env.NEXT_PUBLIC_URL + '/api/getPolygon',{
            country: country_name
        })
        .then(data=>dispatch({type:"ADD_POLYGON", payload:data}))
    }
}