import { Link } from "react-router";

export default function BikeCard({
    _id,
    name,
    type,
    price,
    imageUrl
}) {
    return (
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
                                    <p>Housing: <span><img src={imageUrl} alt={name}/></span></p>
                                </div>
                                {/* <div>
                                    <p>Decsription: <p>Innovative Technology for Peak Performance

                                        The SUPREME DH V5 features the groundbreaking High Virtual 
                                        Contact System kinematics, an innovative design that optimizes both 
                                        agility and shock absorption. With integrated aluminum frame inserts, 
                                        you can effortlessly adjust the bike's geometry and performance to suit 
                                        the day's racing conditions, ensuring you are always at your best on the 
                                        track.</p></p>
                                </div> */}
                            </div>
                            <div className="bike-buttons">
                                {/* <!-- <button className=""></button> --> */}
                                
                                {/* <button>Test ride</button> */}
                                {/* <button>Details</button> */}
                                <Link to={`/bikes/${_id}/details`} className="details-button">Details</Link>
                                <p>Price: <span>{price}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}