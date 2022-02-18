function Layout({children}) {
    return ( 
        <div>
            <div className='h-screen'>
                {children}
            </div>
        </div>        
     );
}



export default Layout;