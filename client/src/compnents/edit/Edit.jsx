import { useNavigate, useParams } from "react-router";
import useRequest from "../../hooks/useRequest";
import useForm from "../../hooks/useForm";
import { useEffect } from "react";


export default function Edit() {
    const navigate = useNavigate();
    const { bikeId } = useParams();
    const { request } = useRequest();

    const editGameHandler = async (values) => {
        // values.price = Number(values.price);
        try {
            await request(`/data/bikes/${bikeId}`, 'PUT', values);

            navigate(`/bikes/${bikeId}/details`);
        } catch (err) {
            alert(err.message);
        }
    }

    const {
        register,
        formAction,
        setValues,
    } = useForm(editGameHandler, {
        name: '',
        type: '',
        price: 0,
        date: '', //it will have to check
        imageUrl: '',
        description: '',
    });

    // const navigate = useNavigate();
    // const { bikeId } = useParams();
    // const { request } = useRequest();

    useEffect(() => {
        request(`/data/bikes/${bikeId}`)
            .then(result => {
                setValues(result);
            })
            .catch(err => {
                alert(err.message);
            })
    }, [bikeId, setValues]);


    return (
        // <section id="edit-page">
        //     <form id="add-new-game" action={formAction}>
        //         <div className="container">

        //             <h1>Edit Game</h1>

        //             <div className="form-group-half">
        //                 <label htmlFor="gameName">Game Name:</label>
        //                 <input
        //                     type="text"
        //                     id="gameName"
        //                     {...register('title')}
        //                     placeholder="Entergame title..."
        //                 />
        //             </div>

        //             <div className="form-group-half">
        //                 <label htmlFor="genre">Genre:</label>
        //                 <input
        //                     type="text"
        //                     id="genre"
        //                     {...register('genre')}
        //                     placeholder="Enter game genre..."
        //                 />
        //             </div>

        //             <div className="form-group-half">
        //                 <label htmlFor="activePlayers">Active Players:</label>
        //                 <input
        //                     type="number"
        //                     id="activePlayers"
        //                     {...register('players')}
        //                     min="0"
        //                     placeholder="0"
        //                 />
        //             </div>

        //             <div className="form-group-half">
        //                 <label htmlFor="releaseDate">Release Date:</label>
        //                 <input
        //                     type="date"
        //                     id="releaseDate"
        //                     {...register('date')}
        //                 />
        //             </div>

        //             <div className="form-group-full">
        //                 <label htmlFor="imageUrl">Image URL:</label>
        //                 <input
        //                     type="text"
        //                     id="imageUrl"
        //                     {...register('imageUrl')}
        //                     placeholder="Enter image URL..."
        //                 />
        //             </div>

        //             <div className="form-group-full">
        //                 <label htmlFor="summary">Summary:</label>
        //                 <textarea
        //                     id="summary"
        //                     {...register('summary')}
        //                     rows="5"
        //                     placeholder="Write a brief summary..."
        //                 ></textarea>
        //             </div>

        //             <input className="btn submit" type="submit" value="EDIT GAME" />
        //         </div>
        //     </form>
        // </section>

        <div className="new-bike-border">
            <div className="header-background">
                <span>Edit bike</span>
            </div>
            <form id="new-bike" action={formAction}>
                <div className="new-bike-name">
                    <label htmlFor="bikeName">bike name <span className="red">*</span></label>
                    <input type="text" id="bikeName" {...register('name')}/>
                    {/* @if (bikeNameError) {
                    <p className="error">
                        {{ bikeNameErrorMessage }}
                    </p>
                    } */}
                </div>
                <div className="new-bike-content">
                    <label htmlFor="descriptionText">description <span className="red">*</span></label>
                    <textarea type="text" id="descriptionText" rows="2"  {...register('description')}></textarea>
                    {/* @if (descriptionError) {
                    <p className="error">
                        {{ descriptionErrorMessage }}
                    </p>
                    } */}
                </div>
                <div className="new-bike-type">
                    <label htmlFor="typeText">type <span className="red">*</span></label>
                    <textarea type="text" id="typeText" rows="1" {...register('type')}></textarea>
                    {/* @if (bikeTypeError) {
                    <p className="error">
                        {{ bikeTypeErrorMessage }}
                    </p>
                    } */}
                </div>
                <div className="new-bike-price">
                    <label htmlFor="priceValue">price <span className="red">*</span></label>
                    <textarea type="text" id="priceValue" rows="1"  {...register('price')}></textarea>
                    {/* @if (tesPriceError) {
                    <p className="error">
                        {{ testPriceErrorMessage }}
                    </p>
                    } */}
                </div>
                <div className="new-bike-image">
                    <label htmlFor="imageUrl">imageUrl<span className="red">*</span></label>
                    <textarea type="text" id="imageUrl" rows="1"  {...register('imageUrl')}></textarea>
                    {/* @if (imageError) {
                    <p className="error">
                        {{ imageErrorMessage }}
                    </p>
                    } */}
                </div>
                <div className="new-bike-buttons">
                    <button type="button" className="cancel">Cancel</button>
                    <button type="submit" className="add-new">Edit</button>    
                </div>
            </form>
        </div>
    );
}
