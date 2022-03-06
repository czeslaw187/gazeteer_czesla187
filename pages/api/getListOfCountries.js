import features from './countriesPoly.json'

export default async function getListOfCountries(req, res) {
    let listOfNames = features.features.map(el=>{
        return el.properties.admin
    })
    res.json(listOfNames)
}