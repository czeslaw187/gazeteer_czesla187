import axios from 'axios'
import response from './countriesPoly.json'

export default async function getPolygon(req, res) {
    const {country} = req.body
    try {
        let searchCountry = response.features.filter(el => {return el.properties.admin == country})
        let searchGeometry = searchCountry[0]
        res.json(searchGeometry)
    } catch(e) {
        res.send({meassage: e.message})
    }
}