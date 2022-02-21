import axios from 'axios'

export default async function geoJson(req, res) {
    const {coords} = req.body
    try {
        const result = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${coords[0]}+${coords[1]}&key=32d0a6b23b434bfe9c3d9aa551aeeea1`)
        let dataObj = {}
        dataObj.currency = result.data.results[0].annotations.currency.iso_code
        dataObj.currency_name = result.data.results[0].annotations.currency.name
        dataObj.country = result.data.results[0].components.country
        dataObj.continent = result.data.results[0].components.continent
        dataObj.country_code = result.data.results[0].components.country_code
        res.send(dataObj)
    } catch(e) {
        res.json({message: e.message})
    }
}