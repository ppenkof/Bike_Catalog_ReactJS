//import { useUserContext } from "../../contexts/UserContext";
import useRequest from "../../hooks/useRequest";
import BikeCard from "../bike-card/BikeCard";


export default function Catalog() {
    const { data: bikes } = useRequest('/bikes', []);

    return (
            <div className="welcome">
                <h4>Bike catalog</h4>
                {bikes.length === 0 && <h3 className="no-articles">No Bikes Yet</h3>}

                <div className="catalog-container">
                    {bikes.map(bike => <BikeCard key={bike._id} {...bike} />)}
                </div>
            </div>
    );
}
