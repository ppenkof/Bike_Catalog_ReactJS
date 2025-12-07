
import { Link } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

export default function Header() {
    const{isAuthenticated} = useUserContext();

    return (
        <>
            <header>
                <div className="mini-navbar-wrap">
                    <div className="logo-wrap">
                    <Link to=""><img src="/download.jfif"/></Link>
                        <p className="logo"> <Link to="/">MTB</Link></p>
                    </div>
                    <div className="mini-navbar">
                        <nav>
                            <ul>
                               
                                <li>
                                    <Link to="/bikes">Catalog</Link>
                                </li>  
                                {/* <li>
                                    <Link to="#">Downhill</Link>
                                </li>
                                <li>
                                    <Link to="#">Enduro</Link>
                                </li>
                                <li>
                                    <Link to="#">Trail</Link>
                                </li> */}

                                {isAuthenticated ? (
                                <>
                                 <li>
                                    <Link to="/my-rides">My Rides</Link>
                                </li>
                                <li>
                                    <Link to="/create">Add Bike</Link>
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
                {/* <!-- <nav>
                    <ul>
                        <li>
                            <Link to="#">Most Popular</Link>
                        </li>
                        <li>
                            <Link to="#">Downhill Bikes</Link>
                        </li>
                    </ul>
                </nav> --> */}

            </header> 
        </>
    ); 
}