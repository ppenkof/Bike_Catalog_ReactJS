import BikeCard from "../bike-card/BikeCard";
import useRequest from "../../hooks/useRequest";
import { useMemo } from "react";


export default function Liked() {
    const { data: likes } = useRequest(`/likes`, []);
    const {data: dataBike } = useRequest(`/bikes`, [], 'GET_ALL');

    const theMostLikedBikes = useMemo(() => {
        const bikes = [];
        let bike = {};
        likes.forEach(like => {
            bike.count = 1;
            bike = dataBike?.find(b => b._id === like.bikeId);

            if (bike) {
                if(bikes.includes(bike)){
                    bike.count ++;
                } else{
                   bikes.push(bike); 
                }           
            }
        });
        bikes.sort((a, b) => b.count - a.count).slice(3);
        return bikes;
    }, [likes, dataBike]);

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