import axios from 'axios'

export default async function geoJson(req, res) {
    if (req.body) {
        const {mapData} = req.body
        try {
            const result = await axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=${process.env.NEXT_PUBLIC_LOCATIONIQ}&lat=${mapData[0]}&lon=${mapData[1]}&format=json`)
            res.send(result.data.address.country)
        } catch(e) {
            res.json({message: e.message})
        }
    }
}