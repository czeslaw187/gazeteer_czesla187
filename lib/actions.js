import axios from 'axios'

export function loadGeoJson(coords) {
    return(dispatch)=>{
        return axios.post(process.env.NEXT_PUBLIC_URL + '/api/getGeoJson', {
            coords: coords
        })
        .then(data=>dispatch({type:"ADD_ITEM", payload:data}))
    }
}