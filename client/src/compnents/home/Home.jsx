import { useContext } from "react";
import BikeCard from "../bike-card/BikeCard";
import "./home.css";
import UserContext from "../../contexts/UserContext";
import useRequest from "../../hooks/useRequest";
import { Link } from "react-router";

export default function Home() {
    //Data collection way
    // const {data: lastestBikes} = useRequest(`/data/bikes?sortBy=likes%20desc&pageSize=3`, []);//sort by creation date - useRequest(`/data/bikes?sortBy=_createdOn%20desc&pageSize=3`, []); 
    // const {user} = useContext(UserContext);

    //Jsonstore collection way
    //const {data} = useRequest(`/bikes?sortBy=likes%20desc&pageSize=3`, [],'GET_ALL');
    //sort by creation date
    const {data} = useRequest(`/bikes?sortBy=_createdOn%20desc&pageSize=3`, [], 'GET_ALL'); //request data collection - /data/bikes?sortBy=likes%20desc&pageSize=3
    const {user} = useContext(UserContext);
    const lastestBikes = data.slice(3);

    return (
        <div className="welcome">
            {user ? <h3>Welcome, {user.email}!</h3> :
                <h3>Welcome!</h3>
            }      
            <p>
                This MTB Website is a place, where you can comment a bike and like it. You can also see which bikes are <Link to="/the-most-liked">the most liked.</Link> Book a ride on tel: 0888-123-456-789
            </p>
            <div className="logged">
                <h4>Latest Added Bikes</h4>              
                        {lastestBikes.length === 0 && <p className="no-bikes">No bikes yet</p>}
                        {lastestBikes.map(bike => <BikeCard key={bike._id} {...bike} />)}
            </div>
        </div>
    );
}
