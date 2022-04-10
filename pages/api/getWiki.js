import axios from 'axios'

export default async function getWiki(req, res) {
    let {countryName} = req.body
    try {
        let wikiContent = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=info|extracts&inprop=url&exintro&explaintext&redirects=1&titles=${countryName}`)
        let wikipedia = wikiContent.data.query.pages
        for (let key in wikipedia) {
            if (wikipedia[key].title !== 'Undefined') {
                wikipedia.content = wikipedia[key].extract
                wikipedia.wikiUrl = wikipedia[key].fullurl
            } else {
                wikipedia.content = ["No content"]
            }
        }
        res.json(wikipedia)
    } catch(e) {
        res.json({message: e.message})
    }
}

