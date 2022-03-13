import axios from 'axios'

export default async function forwardGeo(req, res) {
    const {countryName} = req.body
    try {
        let response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
        const respObj = {}
        respObj.name = response.data[0].name.common
        respObj.currency = response.data[0].currencies
        respObj.capital = response.data[0].capital
        respObj.latLng = response.data[0].latlng
        respObj.population = response.data[0].population
        respObj.flag = response.data[0].flags.png
        respObj.capitalInfo = response.data[0].capitalInfo
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
