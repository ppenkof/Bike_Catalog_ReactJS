//import { useContext } from "react";
import BikeCard from "../bike-card/BikeCard";
//import "./home.css";
//import UserContext from "../../contexts/UserContext";
import useRequest from "../../hooks/useRequest";
//import { Link } from "react-router";

export default function Liked() {
    //Data collection way
    // const {data: theMostLikedBikes} = useRequest(`/data/bikes?sortBy=likes%20desc&pageSize=3`, []);//sort by creation date - useRequest(`/data/bikes?sortBy=_createdOn%20desc&pageSize=3`, []); 
    // const {user} = useContext(UserContext);

    //Jsonstore collection way
    const {data} = useRequest(`/bikes?sortBy=likes%20desc&pageSize=3`, [],'GET_ALL');
    //const {user} = useContext(UserContext);
    const theMostLikedBikes = data.slice(3);

    return (
        <div className="welcome">
            <div className="logged">
                <h4>The Most Liked Bikes</h4>              
                        {theMostLikedBikes.length === 0 && <p className="no-bikes">No bikes yet</p>}
                        {theMostLikedBikes.map(bike => <BikeCard key={bike._id} {...bike} />)}
            </div>
        </div>
    );
}