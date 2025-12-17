
import { Link } from "react-router";
import { useUserContext } from "../../contexts/UserContext";



export default function Header() {
    const{isAuthenticated, isAdmin} = useUserContext();

    return (
        <>
            <header>
                <div className="mini-navbar-wrap">
                    <div className="logo-wrap">
                    <Link to=""><img src="images/download.jpg"/></Link>
                        <p className="logo"> <Link to="/">MTB</Link></p>
                    </div>
                    <div className="mini-navbar">
                        <nav>
                            <ul>
                               
                                <li>
                                    <Link to="/bikes">Catalog</Link>
                                </li>  
                                <li>
                                    <Link to="/the-most-liked">Really Liked</Link>
                                </li>  

                                {isAuthenticated ? (
                                    <>
                                        {isAdmin && (
                                            <li>
                                                <Link to="bikes/create">Add Bike</Link>
                                            </li> 
                                        )}
                                    <li>
                                        <Link to="/my-likes">My Likes</Link>
                                    </li>
                                     <li>
                                        <Link to="/edit-register">Edit User</Link>
                                    </li>
                                    <li>
                                        <Link to="/logout">Logout</Link>
                                    </li>
                                   
                                    </>
                                ) : (
                                 <>   
                                <li>
                                <Link to="/login">Login</Link>
                                </li>
                                <li>
                                <Link to="/register">Register</Link>
                                </li>
                                </>
                                )}
                                 
                            </ul>
                        </nav>
                    </div>                
                </div>
            </header> 
        </>
    ); 
}