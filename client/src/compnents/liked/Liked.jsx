import BikeCard from "../bike-card/BikeCard";
import useRequest from "../../hooks/useRequest";
import { useMemo } from "react";


export default function Liked() {
    const { data } = useRequest(`/likes`, []);
    const {data: dataBike } = useRequest(`/bikes`, [], 'GET_ALL');

    const allLike = useMemo(() => {
        const map = data.slice(0,3);
           return map;
       },[data]);

    const theMostLikedBikes = useMemo(() => {
        const bikes = [];
        allLike.forEach(like => {
            const bike = dataBike?.find(b => b._id === like.bikeId);
            if (bike) {
                bikes.push(bike);
            }
        });
        return bikes;
    }, [allLike, dataBike]);

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