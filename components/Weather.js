import Image from "next/image";

function Weather({weather, setWeather, country}) {
    let todayForecast = country?.countryData?.data?.forecast
    todayForecast = todayForecast && todayForecast.length > 0 ? todayForecast.slice(0,8) : null
    return ( 
        <div className={ weather ?
            "max-w-2xl transition-slider h-4/6 relative z-[9998] mx-auto mt-16 p-0 bg-emerald-100 rounded-md" :
            "max-w-0 transition-slider h-3/6 bg-white relative z-[9998] mx-auto mt-16"
            }>
            <button className={weather ? "visible ml-auto mr-3 mt-2 text-lg block" : "invisible"} onClick={()=>{setWeather(!weather)}}>x</button>
            <h2 className={weather ? "w-full text-center relative z-[9998] text-xl mb-3" : "invisible"}>Today</h2>
            <div className="flex flex-row overflow-x-auto h-3/6">
                {
                    todayForecast ? todayForecast.map(el=>{
                        return (
                            <div className="w-3/12 h-3/6 border-gray-100 border-x-2">
                                <p className="text-center">{el.date}</p>
                                <Image src={`http://openweathermap.org/img/wn/${el.icon}@2x.png`} alt={el.description} width={100} height={80}/>
                                <p className="text-center">{el.description}</p>
                                <p className="text-center">Temperature {el.temp}<sup>o</sup>C</p>                        
                                <p className="text-center">Feels like {el.feels}<sup>o</sup>C</p>           
                            </div>
                        )
                    }) : null
                }
                <hr/>
            </div>
        </div>
     );
}

export default Weather;