import { Outlet } from "react-router"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Body = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body