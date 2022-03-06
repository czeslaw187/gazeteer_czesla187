import {useState} from 'react'
import {connect} from 'react-redux'

function Navbar(props) {
    let listOfCountries = props.state ? props.state.countires : 'loading...'
    console.log(listOfCountries, 'navbar')
    const [visible,setVisible] = useState(false)
    return ( 
        <nav className="w-screen min-h-fit px-3 bg-gradient-to-tl from-green-500 to-emerald-100">
            <div className="flex flex-row justify-between h-full">
                <a href="#" className="font-mono text-blue-800 text-3xl my-auto">MyMap</a>                
                <button className='w-4/12 md:w-1/12 h-10 my-3 mr-4 border-2 border-slate-800 rounded-md p-1 hover:bg-green-600' onClick={()=>{setVisible(!visible)}}>Menu</button>
            </div>
            <div className={visible ? "w-4/12 ml-auto my-auto h-auto animate-dropdown" : "w-4/12 ml-auto my-auto h-0"}>
                <ul className="w-full flex flex-col text-right text-xl">
                    {
                        props.state ? props.state.countries.map(el=>{
                            return <li className='mr-10 mb-2 hover:text-indigo-600'><a href="#">{el}</a></li>
                        }) : null
                    }
                    <li className='mr-10 mb-2 hover:text-indigo-600'><a href="#">first</a></li>
                    <li className='mr-10 mb-2 hover:text-indigo-600'><a href="#">second</a></li>
                    <li className='mr-10 mb-2 hover:text-indigo-600'><a href="#">third</a></li>
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

export default connect(mapStateToProps)(Navbar)