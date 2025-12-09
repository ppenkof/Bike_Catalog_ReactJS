import { Route, Routes } from "react-router"
import Header from "./compnents/header/Header"
import Footer from "./compnents/footer/Footer"
import Catalog from "./compnents/catalog/Catalog"

//import UserContext from "./contexts/UserContext"
//import { useContext } from "react"

function App() {
  //const {user} = useContext(UserContext);

  return (
    <>
      <Header />

      <Routes>
        {/* <Route path="/" element = {<Home />} /> */}
        <Route path="/bikes" element = {<Catalog />} />
        {/* <Route path="/bikes/:bikeId/details" element = {<Details user={user}/>} /> */}
        {/* <Route path="/bikes/create" element = {<BikeCreate />} /> */}
        {/* <Route path="/bikes/:bikeId/edit" element = {<Edit />} /> */}
        {/* <Route path="/register" element = {<Register />} /> */}
        {/* <Route path="/login" element = {<Login />} /> */}
        {/* <Route path="/logout" element = {<Logout />} /> */}
      </Routes>

      <Footer /> 
    </>
  )
}

export default App
