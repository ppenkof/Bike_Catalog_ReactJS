import useRequest from "../../hooks/useRequest";
import BikeCard from "../bike-card/BikeCard";

// const baseUrl = 'http://localhost:3030/jsonstore/games';
export default function Catalog() {
    //New method with custom hook
    const {data: bikes} = useRequest('/data/bikes', []);

    return (
        // <div className="container">
            // <main>
            <>
                {bikes.length === 0 && <h3 className="no-articles">No Bikes Yet</h3>}

                <div className="catalog-container">
                    {bikes.map(bike => <BikeCard key={bike._id} {...bike} />)}
                </div>
            </>
            // </main>
        // </div>
    );
}