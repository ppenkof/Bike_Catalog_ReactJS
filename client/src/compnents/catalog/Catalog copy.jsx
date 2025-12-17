import useRequest from "../../hooks/useRequest";
import BikeCard from "../bike-card/BikeCard";


export default function Catalog() {
    const {data: bikes} = useRequest('/data/bikes', []);

    console.log(`Bikes: ${JSON.stringify(bikes)}`);
    

    return (
            <>
                {bikes.length === 0 && <h3 className="no-articles">No Bikes Yet</h3>}

                <div className="catalog-container">
                    {bikes.map(bike => <BikeCard key={bike._id} {...bike} />)}
                </div>
            </>
    );
}