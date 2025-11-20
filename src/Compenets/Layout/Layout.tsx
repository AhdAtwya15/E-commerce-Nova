import { Outlet, useNavigation } from "react-router-dom"
import Navbar from "../Utility/Navbar"
import Footer from "../Utility/Footer"
import ScrollToTop from "../Utility/ScrollToTop"
import { Spiral } from 'ldrs/react'
import 'ldrs/react/Spiral.css'





const Layout = () => {

    const navigation = useNavigation(); 
    const isLoading = navigation.state === "loading";
return (
    <div className="overflow-x-hidden">
        <Navbar/>
        {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <Spiral size="50" speed="1" color="#3B8D90" />
        </div>
      )}

         <ScrollToTop /> 
            <div>
                <Outlet/>
            </div>
        <Footer/>


    </div>
)
}

export default Layout
