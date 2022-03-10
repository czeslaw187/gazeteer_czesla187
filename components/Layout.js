import Navbar from './NavBar.js'

function Layout({children}) {
    return ( 
        <div>
            <Navbar key={'navbar'} />
            <div className='h-screen'>
                {children}
            </div>
        </div>        
     );
}



export default Layout;