//import { useUserContext } from "../../contexts/UserContext";
import useRequest from "../../hooks/useRequest";
import BikeCard from "../bike-card/BikeCard";


export default function Catalog() {
    //New method with custom hook
    // const {user} = useUserContext();
    //const {data: bikesData} = useRequest('/bikes',['GET', null, {j:'j'} ]);

    // try {
    //     useRequest('/data/bikes','POST', [...bikesData, {_ownerId: user._id}])

    // } catch (error) {
    //     alert(error.message)
    // }

    const { data: bikes } = useRequest('/bikes', [], 'GET_ALL');
    //const bikes = Object.values(data);

    console.log(`Bikes: ${(bikes)}`);


    return (
        <>
            {bikes.length === 0 && <h3 className="no-articles">No Bikes Yet</h3>}

            <div className="catalog-container">
                {bikes.map(bike => <BikeCard key={bike._id} {...bike} />)}
            </div>
        </>
    );
}
