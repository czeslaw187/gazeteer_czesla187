import axios from 'axios'

export default async function geoJson(req, res) {
    if (req.body) {
        const {mapData} = req.body
        try {
            const result = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${mapData[0]}&longitude=${mapData[1]}&localityLanguage=en`, {
                headers: ['Access-Control-Allow-Origin: *', 'Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token']
            })
            res.json(result.data.countryName)
        } catch(e) {
            res.json({message: e.message})
        }
    }
}