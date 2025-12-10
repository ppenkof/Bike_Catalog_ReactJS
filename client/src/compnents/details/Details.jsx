import { useNavigate, useParams } from "react-router";
import CreateComent from "./create-comment/CreateComent";
import "./Details.css";
import useRequest from "../../hooks/useRequest";
import { useUserContext } from "../../contexts/UserContext";
import DetailsComments from "./details-comments/DetailsComments";
import { useOptimistic } from "react";

export default function Details() {
    const {user, isAuthenticated, isAdmin} = useUserContext();
    const {bikeId} = useParams();
    const navigate = useNavigate();
    //const [refresh, setRefresh] = useState(false);
    const {data: bike, request} = useRequest(`/data/bikes/${bikeId}`, {});

    // const urlParams = new URLSearchParams({
    //     where: `bikeId="${bikeId}"`,
    //     load: 'author=_ownerId:users'
    // });
// console.log(`urlParams: ${urlParams}`);
// console.log(`BIKEID: ${bikeId}`);

    const { data: comments, setData: setComments } = useRequest(`/data/comments`, []); //urlParams.toString()

   // console.log(`Comments: ${JSON.stringify(comments)}`);
    const filteredComments = comments.filter(comment => comment.data.bikeId == bikeId);
    //console.log(`filteredComment: ${filteredComments}`);

    // Fix bug with additional re-renders
    const [optimisticComments, dispatchOptimisticComments] = useOptimistic(filteredComments, (state, action) => {
        //console.log(`Comments: ${comments}`);
        //console.log(`filteredComment: ${JSON.stringify(filteredComments)}`);
        switch (action.type) {
            case 'ADD_COMMENT':
                return [...state, action.payload];
            default:
                return state;
        }
    });

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

    // const refreshHandler = () => {
    //     setRefresh(state => !state);
    // }

    const likeBikeHandler = () => {

    }

    const createdCommentHandler = (createdComment) => {
        setComments(prevComments => [...prevComments, { ...createdComment, author: user }]);
    };

    const beginingCommentHandler = (newComment) => {
        dispatchOptimisticComments({ type: 'ADD_COMMENT', payload: { ...newComment, author: user, pending: true } });
    };

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
                                            <p>Housing: <span><img src={bike.imageUrl} alt={bike.name}/></span></p>
                                        </div>
                                        <div>
                                            <p>Decsription: <span>{bike.description}</span></p>
                                        </div>
                                    </div>
                                    <div className="bike-buttons">
                                        <p>Price: <span>{bike.price}$</span></p>
                                        {/* <!-- <button className=""></button> --> */}

                                        <DetailsComments comments={optimisticComments}/>
                                        
                                        {isAuthenticated && (<>
                                            {isAdmin ? (<>
                                                <button className="details-button" onClick={editBikeHandler}>Edit</button>
                                                <button className="details-button" onClick={deleteBikeHandler}>Delete</button>
                                                </> 
                                            ) : (<>
                                                <button className="details-button" onClick={likeBikeHandler}>Like</button>
                                                <CreateComent user={user} onBegin={beginingCommentHandler} onCreated={createdCommentHandler}/>
                                                </>)}
                                            {/* <CreateComent user={user} onBegin={beginingCommentHandler} onCreated={createdCommentHandler}/> */}
                                        </>
                                        )}
                                        <button className="details-button" onClick={cancelBikeHandler}>Back</button>
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