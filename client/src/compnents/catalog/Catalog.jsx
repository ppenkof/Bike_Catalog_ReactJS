import useRequest from "../../../bin/useRequest";
//import { useUserContext } from "../../contexts/UserContext";
import BikeCard from "../bike-card/BikeCard";


export default function Catalog() {
    //New method with custom hook
    //const {user} = useUserContext();
    // const {data: bikesData} = useRequest('/data/bikes', []);

    // try {
    //      useRequest('/data/bikes','POST', {...bikesData, _ownerId: user._id}, [])

    // } catch (error) {
    //     alert(error.message)
    // }
   
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