import { Route, Routes } from "react-router"
import Header from "./compnents/header/Header"
import Footer from "./compnents/footer/Footer"
import Catalog from "./compnents/catalog/Catalog"
import Home from "./compnents/home/Home"
import Details from "./compnents/details/Details"
import Login from "./compnents/login/Login"
import Register from "./compnents/register/Register"
import Logout from "./compnents/logout/Logout"
import BikeCreate from "./compnents/bike-create/BikeCreate"
import Edit from "./compnents/edit/Edit"
import { useUserContext } from "./contexts/UserContext"
import Liked from "./compnents/liked/Liked"
import EditUser from "./compnents/edit-user/EditUser"
import MyLikes from "./compnents/myLikes/MyLikes"


function App() {
  const {user, isAuthenticated, isAdmin} = useUserContext();

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/the-most-liked" element = {<Liked/>} />
        <Route path="/bikes" element = {<Catalog />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/bikes/:bikeId/details" element = {<Details user = {user}/>} />
        {isAuthenticated && (<>
          <Route path="/edit-register" element = {<EditUser user = {user}/>} />
          <Route path="/my-likes" element = {<MyLikes user = {user}/>} />
          {isAdmin && (<>
            <Route path="/bikes/create" element = {<BikeCreate />} />
            <Route path="/bikes/:bikeId/edit" element = {<Edit />} />
          </>)}
          <Route path="/logout" element = {<Logout />} />
       </> 
      )};
      </Routes>

      <Footer /> 
    </>
  )
}

export default App
