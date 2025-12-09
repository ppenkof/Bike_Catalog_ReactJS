import { useNavigate, useParams } from "react-router";
import CreateComent from "./create-comment/CreateComent";
import DetailsComments from "./details-comments/DetailsComments";
import useRequest from "../../../bin/useRequest";
import { useState } from "react";
import "./Details.css";
import { useUserContext } from "../../../bin/UserContext";

export default function Details() {
    const {user, isAuthenticated} = useUserContext();
    const {bikeId} = useParams();
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const {data: bike, request} = useRequest(`/data/bikes/${bikeId}`, {});

    //Old way with useEffect and useState
    // useEffect(() => {
    //     // fetch(`http://localhost:3030/jsonstore/bikes/${bikeId}`)
    //     //     .then(response => response.json())
    //     //     .then(result => {
    //     //         setbike(result);
    //     //     })
    //     //     .catch(err => alert(err.message));

    //     request(`/bikes/${bikeId}`)
    //         .then(result => {
    //             setbike(result);
    //         })
    //         .catch(err => alert(err.message));

    // }, [bikeId]);

    const deleteBikeHandler = async () => {
        navigate(`/bikes/${bikeId}/delete`);

        const isConfirmed = confirm(`Are you sure you want to delete ${bike.name} bike?`);
        if(!isConfirmed){
            navigate(`/bikes/${bike._id}/details`);
            return;
        }

        try {
            await request(`/data/bikes/${bikeId}`, 'DELETE');
            navigate('/bikes');

        } catch (error) {
            alert('Unable to delete bike:', error.message); 

        }    
    }

    const editBikeHandler = () => {
        navigate(`/bikes/${bike._id}/edit`);
    }

    const cancelBikeHandler = () => {
        navigate(`/bikes`);
    }

    const refreshHandler = () => {
        setRefresh(state => !state);
    }

    return (
        <div className="container"> 
            <main>
                <div className="bike-title">   
                    <div className="bike-container">
                        <div className="bike-name-wrapper">
                            <div className="bike-name">
                                {/* <Link to="#" className="normal"> */}
                                    <div className="name-wrapper"> 
                                        <h2>{bike.type}</h2>
                                    </div> 
                                {/* </Link> */}
                                <div className="columns">
                                    <div>
                                        <p>{bike.name}</p>
                                        <div className="nick-name">
                                            <p>Housing: <span><img src={bike.imageUrl} alt={name}/></span></p>
                                        </div>
                                        <div>
                                            <p>Decsription: <p>{bike.description}</p></p>
                                        </div>
                                    </div>
                                    <div className="bike-buttons">
                                        <p>Price: <span>{bike.price}$</span></p>
                                        {/* <!-- <button className=""></button> --> */}

                                        <DetailsComments refresh={refresh}/>
                                        
                                        {isAuthenticated && (<>
                                        {/* Todo: You can see those buttons if you are a creator */}
                                            <button className="edit" onClick={editBikeHandler}>Edit</button>
                                            <button className="delete" onClick={deleteBikeHandler}>Delete</button>
                                            <CreateComent user={user} onCreate={refreshHandler}/>
                                        </>
                                        )}
                                        <button className="details-button" onClick={cancelBikeHandler}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}