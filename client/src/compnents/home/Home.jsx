import { useContext } from "react";
import useRequest from "../../hooks/useRequest";
import BikeCard from "../bike-card/BikeCard";
import "./Home.css";
import UserContext from "../../contexts/UserContext";

export default function Home() {
    //Second way
    const {data: lastestBikes} = useRequest(`/data/bikes?sortBy=_createdOn%20desc&pageSize=3`, []);
    const {user} = useContext(UserContext);

    return (
        <div className="welcome">
            {user ? <h3>Welcome, {user.email}!</h3> :
                <h3>Welcome!</h3>
            }
        
            <p>
                This MTB Website is a place, where you can book a test ride of a bike and like it. You can also see which bikes are the most liked.
            </p>
            <div className="logged">
                <h4>Latest Bikes</h4>
                <div className="container"> 
                   <main>
                        {lastestBikes.length === 0 && <p className="no-bikes">No bikes yet</p>}
                        {lastestBikes.map(bike => <BikeCard key={bike._id} {...bike} />)}
                    </main>
                </div>
            </div>
        </div>
    );
}