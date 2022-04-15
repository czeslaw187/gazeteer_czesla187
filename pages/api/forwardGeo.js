import axios from 'axios'
import countriesPolys from './countriesPoly.json'

export default async function forwardGeo(req, res) {
    const {countryName} = req.body
    try {
        let searchCountry = countriesPolys.features.filter(el => {return el.properties.admin == countryName})
        searchCountry = searchCountry ? searchCountry : 'No data'
        let searchGeometry = searchCountry[0]

        let bbox = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.NEXT_PUBLIC_LOCATIONIQ}&q=${countryName}&format=json`)
        let response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
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

        let weather = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${respObj.latLng[0]}&lon=${respObj.latLng[1]}&exclude=minutely,hourly,alerts&appid=${process.env.NEXT_PUBLIC_OPENWEATHER}`)
        weather = weather.data.list
        let responseForecast = []
        for (let i in weather) {
            weather[i].dt_txt = weather[i].dt_txt.split(' ')
            weather[i].dt_txt = weather[i].dt_txt[1]
            responseForecast[i] = {
                date: weather[i].dt_txt,
                temp: Math.round(Math.floor(weather[i].main.temp - 273.4)),
                feels: Math.round(Math.floor(weather[i].main.feels_like - 273.4)),
                description: weather[i].weather[0].main,
                icon: weather[i].weather[0].icon
            }
        }

        respObj.majorCities = citiesOf
        respObj.polygon = searchGeometry
        respObj.wikipedia = wikipedia
        respObj.forecast = responseForecast
        res.json(respObj)
    } catch(e) {
        let respObj = {}
        respObj.error = "No content"
        res.json(respObj)
    }
}
