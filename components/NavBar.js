import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import * as actionCreator from '../lib/actions.js'

function Navbar({state, loadPoly, loadInfo}) {
    let listOfCountries = state ? state.countires : 'loading...'
    const [visible,setVisible] = useState(false)
    const [currentCountry, setCurrentCountry] = useState(state?.mapData[0]?.data)

    useEffect(()=>{
        if (currentCountry) {
            loadPoly(currentCountry)
            loadInfo(currentCountry)
        }
    },[currentCountry])

    return ( 
        <nav className="w-screen min-h-fit max-h-52 sticky overflow-auto px-3 bg-gradient-to-tl from-green-500 to-emerald-100">
            <div className="flex flex-row justify-between h-full">
                <a href="#" className="font-mono text-blue-800 text-3xl my-auto">MyMap</a>                
                <button className='w-4/12 md:w-1/12 h-10 my-3 mr-4 border-2 border-slate-800 rounded-md p-1 hover:bg-green-600' onClick={()=>{setVisible(!visible)}}>Menu</button>
            </div>
            <div className={visible ? "w-4/12 ml-auto my-auto max-h-52 animate-dropdown" : "w-4/12 ml-auto my-auto h-0"}>
                <ul className="w-full flex flex-col text-right text-xl">
                    {
                        state ? state.countries.map((el,id)=>{
                            return <li key={id} className='mr-10 mb-2 hover:text-indigo-600'><button onClick={(e)=>{setCurrentCountry(e.target.innerHTML)}}>{el}</button></li>
                        }) : null
                    }
                </ul>
            </div>
        </nav>
     );
}

function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadPoly: (country)=>{dispatch(actionCreator.getBorders(country))},
        loadInfo: (country)=>{dispatch(actionCreator.getInfo(country))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)