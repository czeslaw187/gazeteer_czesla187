function Weather({weather, setWeather}) {
    return ( 
        <div className={ weather ?
            "max-w-2xl transition-slider h-3/6 bg-white relative z-[9998] mx-auto mt-16" :
            "max-w-0 transition-slider h-3/6 bg-white relative z-[9998] mx-auto mt-16"
            }>
            <button className={weather ? "visible ml-auto mr-3 mt-2 text-lg block" : "invisible"} onClick={()=>{setWeather(!weather)}}>x</button>
            <div className="flex flex-row overflow-x-auto">
                
            </div>
        </div>
     );
}

export default Weather;