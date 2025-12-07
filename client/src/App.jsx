import './App.css'
import { Route, Routes } from "react-router"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import Details from "./components/details/Details"
import BikeCreate from "./components/bike-create/BikeCreate"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import Logout from "./components/logout/Logout"
import Edit from "./components/edit/Edit"
import UserContext from "./contexts/UserContext"
import { useContext } from "react"

function App() {
  const {user} = useContext(UserContext);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/bikes" element = {<Catalog />} />
        <Route path="/bikes/:bikeId/details" element = {<Details user={user}/>} />
        <Route path="/bikes/create" element = {<BikeCreate />} />
        <Route path="/bikes/:bikeId/edit" element = {<Edit />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/logout" element = {<Logout />} />
      </Routes>

<Footer /> 
    </>
  )
}

export default App
