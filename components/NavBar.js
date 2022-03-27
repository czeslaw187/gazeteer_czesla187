import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import * as actionCreator from '../lib/actions.js'

function Navbar(props) {
    let listOfCountries = props.state ? props.state.countires : 'loading...'
    const [visible,setVisible] = useState(false)
    const [currentCountry, setCurrentCountry] = useState(props.state?.mapData[0]?.data)

    useEffect(()=>{
        if (currentCountry) {
            props.loadPoly(currentCountry)
            props.loadInfo(currentCountry)
        }
    },[currentCountry])

    return ( 
        <nav className="w-screen min-h-24 z-[10000] fixed px-3 bg-gradient-to-tl from-green-500 to-emerald-100">
            <div className="flex flex-row justify-betweenx w-full h-full">
                <a href="#" className="font-mono text-blue-800 text-3xl my-3">MyMap</a>                
                <button className='w-4/12 md:w-1/12 h-10 my-3 mr-0 right-4 fixed border-2 border-slate-800 rounded-md p-1 hover:bg-green-600' onClick={()=>{setVisible(!visible)}}>Menu</button>
            </div>   
            <div className={visible ? "w-4/12 ml-auto my-auto max-h-72 transition-slider overflow-auto" : "w-4/12 ml-auto my-auto max-h-0 transition-slider overflow-auto"}>
                <ul className="flex flex-col text-right text-xl z-[10000]">
                    {
                        props.state ? props.state.countries.map((el,id)=>{
                            return (
                                <>
                                    <li key={id} className='text-justify mb-2 hover:text-indigo-600'>
                                        <button onClick={(e)=>{setCurrentCountry(e.target.innerHTML)}}>{el}</button>
                                    </li>
                                    <hr/>
                                </>
                            )
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