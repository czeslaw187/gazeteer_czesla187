import axios from 'axios'

export default async function forwardGeo(req, res) {
    const {countryName} = req.body
    try {
        // let response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.NEXT_PUBLIC_LOCATIONIQ}&country=${countryName}&format=json`)
        let response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
        const respObj = {}
        respObj.name = response.data[0].name.common
        respObj.currency = response.data[0].currencies
        respObj.capital = response.data[0].capital
        respObj.latLng = response.data[0].latlng
        respObj.population = response.data[0].population
        respObj.flag = response.data[0].flags.png
        respObj.capitalInfo = response.data[0].capitalInfo.latlng
        console.log(respObj, 'forward')
        res.json(respObj)
    } catch(e) {
        res.json({message: e.message})
    }
}
