import axios from 'axios'

export default async function getPolygon(req, res) {
    const {country} = req.body
    console.log(country, 'getPolygon')
    try {
        let response = await axios.get(process.env.NEXT_PUBLIC_URL + '/api/countries')
        response = response.features.filter(country=> country.properties.ADMIN == country)
        response = response.geometry.coordinates
    } catch(e) {
        res.send({meassage: e.message})
    }
}