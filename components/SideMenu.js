function SideMenu({country, sideMenu, setSideMenu}) {
    return ( 
        <div className={sideMenu == true ? 
            "max-w-full md:max-w-xl transition-slider relative top-14 h-5/6 bg-sky-200 z-[9999] border-2 border-gray-800 rounded-sm px-1 overflow-x-auto" : 
            "max-w-0 transition-slider absolute h-5/6 top-14 z-[9999] border-2 border-gray-800 rounded-sm px-0 overflow-x-auto"}>
            <button className="w-[15] h-auto text-lg pl-3 font-bold relative left-console underline text-blue-600" onClick={()=>{setSideMenu(!sideMenu)}} >{"<<"}</button>       
            <h1 className="text-2xl mt-7 mb-5 text-center">{country.countryData?.data?.name}</h1>
            <hr/>
            <img src={country.countryData?.data?.flag} alt="flag" className="mr-auto ml-5 border-2 border-gray-900 w-6/12 h-auto" /> 
            <hr/>
            <p className="text-lg font-bold mx-6 my-5">Capital: {country.countryData?.data?.capital}</p>  
            <hr/>
            <p className="text-lg font-bold mx-6 my-5">Population: {country.countryData?.data?.population}</p>  
            <hr/>
            <div dangerouslySetInnerHTML={{__html: country.countryData?.data?.wikipedia.content}} /><a href={country.countryData?.data?.wikipedia.wikiUrl} target="_blank">{country.countryData?.data?.wikipedia.content ? 'more...' : 'No content'}</a>
        </div>
     );
}

export default SideMenu;