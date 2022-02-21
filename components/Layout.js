import Navbar from './NavBar.js'

function Layout({children}) {
    return ( 
        <div>
            <Navbar />
            <div className='h-screen'>
                {children}
            </div>
        </div>        
     );
}



export default Layout;