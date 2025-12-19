import { useNavigate, useParams } from "react-router";
import CreateComent from "./create-comment/CreateComent";
import "./Details.css";
import useRequest from "../../hooks/useRequest";
import { useUserContext } from "../../contexts/UserContext";
import DetailsComments from "./details-comments/DetailsComments";
import { useOptimistic, useMemo } from "react";
import dateConverter from "../../utils/DateFormatConverter";

export default function Details() {
    const { user, isAuthenticated, isAdmin } = useUserContext();
    const { bikeId } = useParams();
    const navigate = useNavigate();

    const { data: bikes, request: requestBikes } = useRequest(`/bikes`, []);

    const { data: likes, request: requestLikes } = useRequest(`/likes`, []);

    const isBikeLikedByCurrentUser = useMemo(() => {
        return likes.findIndex(currentLike => user && currentLike.bikeId === bikeId && currentLike.userId === user._id) > -1
    }, [bikeId, likes, user]);
    const likesCount = useMemo(() => { likes.filter(currentLike => currentLike.bikeId === bikeId).length || 0 }, [bikeId, likes]);

    const bike = useMemo(() => bikes.find(currentBike => currentBike._id === bikeId) || {}, [bikes, bikeId]);

    const { data: comments, request: requestComment } = useRequest(
        `/comments`,
        [],
        "GET_ALL"
    );


    const filteredComments = useMemo(() => comments?.filter(
        (comment) => comment.data.bikeId == bikeId
    ), [comments, bikeId]);



    const [optimisticComments, dispatchOptimisticComments] = useOptimistic(
        filteredComments,
        (state, action) => {
            switch (action.type) {
                case "ADD_COMMENT":
                    return [...state, action.payload];
                default:
                    return state;
            }
        }
    );

    const deleteBikeHandler = async () => {
        navigate(`/bikes/${bikeId}/delete`);

        const isConfirmed = confirm(
            `Are you sure you want to delete ${bike.name} bike?`
        );

        if (!isConfirmed) {
            navigate(`/bikes/${bike._id}/details`);
            return;
        }

        try {
            await requestBikes(`/bikes/${bikeId}`, "DELETE");

            navigate("/bikes");
        } catch (error) {
            alert("Unable to delete bike:", error.message);
        }
    };

    const editBikeHandler = () => {
        navigate(`/bikes/${bike._id}/edit`);
    };

    const cancelBikeHandler = () => {
        navigate(`/bikes`);
    };

    const likeBikeHandler = async () => {
        if (!isAuthenticated || !bike) return;

        if (!isBikeLikedByCurrentUser) {
            requestLikes('/likes', 'POST', {
                userId: user._id,
                bikeId: bikeId
            });
        }
        
    };

    const createdCommentHandler = (createdComment) => {
        dispatchOptimisticComments({ type: 'ADD_COMMENT', payload: { ...createdComment } });
        requestComment('/comments', 'POST', createdComment);
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
                                            <p>
                                                Housing:{" "}
                                                <span>
                                                    <img src={bike.imageUrl} alt={bike.name} />
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                Decsription: <span>{bike.description}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bike-buttons">
                                        <p>
                                            Price: <span>{bike.price}$</span>
                                        </p>
                                        <p>
                                            Created: <span>{dateConverter(bike._createdOn)}</span>
                                        </p>
                                        {/* <!-- <button className=""></button> --> */}

                                        <DetailsComments comments={optimisticComments} />

                                        {isAuthenticated && (
                                            <>
                                                {isAdmin ? (
                                                    <>
                                                        <button
                                                            className="details-button"
                                                            onClick={editBikeHandler}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="details-button"
                                                            onClick={deleteBikeHandler}
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            className="details-button"
                                                            onClick={likeBikeHandler}
                                                            disabled={isBikeLikedByCurrentUser}
                                                        >
                                                            Like{" "}
                                                            {likesCount}
                                                        </button>
                                                        <CreateComent
                                                            user={user}
                                                            bikeId={bikeId}
                                                            onCreated={createdCommentHandler}
                                                        />
                                                    </>
                                                )}
                                            </>
                                        )}
                                        <button
                                            className="details-button"
                                            onClick={cancelBikeHandler}
                                        >
                                            Back
                                        </button>
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
