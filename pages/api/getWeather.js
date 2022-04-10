import axios from 'axios'

export default async function getWetaher(req, res) {
    const {latLng} = req.body
    try {
        let weather = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latLng[0]}&lon=${latLng[1]}&exclude=minutely,hourly,alerts&appid=${process.env.NEXT_PUBLIC_OPENWEATHER}`)
        weather = weather.data.list
        let response = []
        for (let i in weather) {
            weather[i].dt_txt = weather[i].dt_txt.split(' ')
            weather[i].dt_txt = weather[i].dt_txt[1]
            response[i] = {
                date: weather[i].dt_txt,
                temp: Math.round(Math.floor(weather[i].main.temp - 273.4)),
                feels: Math.round(Math.floor(weather[i].main.feels_like - 273.4)),
                description: weather[i].weather[0].main,
                icon: weather[i].weather[0].icon
            }
        }
        console.log(response.slice(0,8), 'weather')
        res.json(response)
    } catch(e) {
        res.json({message: e.message})
    }
}