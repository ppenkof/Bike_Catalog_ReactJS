import { Route, Routes } from "react-router"
import Header from "./compnents/header/Header"
import Footer from "./compnents/footer/Footer"
import Catalog from "./compnents/catalog/Catalog"
import Home from "./compnents/home/Home"
import Details from "./compnents/details/Details"
import { useUserContext } from "../bin/UserContext"
import Login from "./compnents/login/Login"
import Register from "./compnents/register/Register"


function App() {
  const {user} = useUserContext();

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/bikes" element = {<Catalog />} />
        <Route path="/bikes/:bikeId/details" element = {<Details user={user}/>} />
        {/* <Route path="/bikes/create" element = {<BikeCreate />} /> */}
        {/* <Route path="/bikes/:bikeId/edit" element = {<Edit />} /> */}
        <Route path="/register" element = {<Register />} />
        <Route path="/login" element = {<Login />} />
        {/* <Route path="/logout" element = {<Logout />} /> */}
      </Routes>

      <Footer /> 
    </>
  )
}

export default App
