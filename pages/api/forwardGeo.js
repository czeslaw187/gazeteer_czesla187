import axios from 'axios'

export default async function forwardGeo(req, res) {
    const {countryName} = req.body
    try {
        let bbox = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.NEXT_PUBLIC_LOCATIONIQ}&q=${countryName}&format=json`)
        let response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
        console.log(response.data[0])
        const respObj = {}
        respObj.name = response.data[0].name.common
        respObj.currency = response.data[0].currencies
        respObj.capital = response.data[0].capital
        respObj.latLng = response.data[0].latlng
        respObj.population = response.data[0].population
        respObj.flag = response.data[0].flags.png
        respObj.capital = response.data[0].capital[0]
        respObj.capitalInfo = response.data[0].capitalInfo.latlng
        respObj.bbox = bbox.data[0].boundingbox
        const citiesData = await import('./citiesData.json')
        let citiesOf = citiesData.features.filter(el=>{return el.properties.ADM0NAME == countryName})
        citiesOf = citiesOf.map(el=>{
            return {
                name: el.properties.NAME,
                latitude: el.properties.LATITUDE,
                longitude: el.properties.LONGITUDE,
                population: el.properties.GN_POP
            }
        })
        respObj.majorCities = citiesOf
        res.json(respObj)
    } catch(e) {
        res.json({message: e.message})
    }
}
