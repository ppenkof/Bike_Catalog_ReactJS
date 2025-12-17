import { Link } from "react-router";
import dateConverter from "../../utils/DateFormatConverter";
import useRequest from '../../hooks/useRequest';
import { useMemo } from "react";

export default function BikeCard({
    _id,
    name,
    type,
    price,
    imageUrl,
    _createdOn,
}) {

    const { data: likes } = useRequest(`/likes`, []);
    const likesCount = useMemo(() => likes.filter(currentLike => currentLike.bikeId === _id).length || 0, [_id, likes]);

    return (
        <div className="container">
            <main>
                <div className="bike-title">
                    <div className="bike-container">
                        <div className="bike-name-wrapper">
                            <div className="bike-name">
                                {/* <Link to="#" className="normal"> */}
                                <div className="name-wrapper">
                                    <h2>{type}</h2>
                                </div>
                                {/* </Link> */}
                                <div className="columns">
                                    <div>
                                        <p>{name}</p>
                                        <div className="nick-name">
                                            <p>Housing: <span><img src={imageUrl} alt={name} /></span></p>
                                        </div>
                                    </div>
                                    <div className="bike-buttons">
                                        <p>Price: <span>{price}$</span></p>
                                        <p>Likes: <span>{likesCount}</span></p>
                                        <p>Created: <span>{dateConverter(_createdOn)}</span></p>

                                        {/* <button>Test ride</button> */}
                                        {/* <button>Details</button> */}
                                        <Link to={`/bikes/${_id}/details`} className="details-button">Details</Link>

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