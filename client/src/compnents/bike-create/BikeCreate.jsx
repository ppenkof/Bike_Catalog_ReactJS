import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";
import "./BikeCreate.css"

export default function BikeCreate() {
    const navigate = useNavigate();
    const { request } = useRequest();

    const createBikeHandler = async (values) => {
        const data = values;

        data.price = Number(data.price);

        try {
            await request('/data/bikes', 'POST', data);

            navigate('/bikes');
        } catch (err) {
            alert(err.message)
        }
    }

    const {
        register,
        formAction,
    } = useForm(createBikeHandler, {
        name: '',
        type: '',
        price: 0,
        date: '', //it will have to check
        imageUrl: '',
        description: '',
    });

    return (
        // <section id="add-page">
        //     <form id="add-new-game" action={formAction}>
        //         <div className="container">

        //             <h1>Add New Game</h1>

        //             <div className="form-group-half">
        //                 <label htmlFor="gameName">Game Name:</label>
        //                 <input type="text" id="gameName" {...register('title')} placeholder="Enter game title..." />
        //             </div>

        //             <div className="form-group-half">
        //                 <label htmlFor="genre">Genre:</label>
        //                 <input type="text" id="genre" {...register('genre')} placeholder="Enter game genre..." />
        //             </div>

        //             <div className="form-group-half">
        //                 <label htmlFor="activePlayers">Active Players:</label>
        //                 <input type="number" id="activePlayers" {...register('players')} min="0" placeholder="0" />
        //             </div>

        //             <div className="form-group-half">
        //                 <label htmlFor="releaseDate">Release Date:</label>
        //                 <input type="date" id="releaseDate" {...register('date')} />
        //             </div>

        //             <div className="form-group-full">
        //                 <label htmlFor="image">Image Url:</label>
        //                 <input type="text" id="image" {...register('imageUrl')} placeholder="Enter image URL..." />
        //             </div>

        //             <div className="form-group-full">
        //                 <label htmlFor="summary">Summary:</label>
        //                 <textarea {...register('summary')} id="summary" rows="5" placeholder="Write a brief summary..."></textarea>
        //             </div>

        //             <input className="btn submit" type="submit" value="ADD GAME" />
        //         </div>
        //     </form>
        // </section>
        
        <div className="new-bike-border">
            <div className="header-background">
                <span>New bike</span>
            </div>
            <form id="add-new-game" action={formAction}>
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
                    <textarea type="text" id="descriptionText" rows="2" {...register('description')}></textarea>
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
                    <textarea type="text" id="priceValue" rows="1" {...register('price')}></textarea>
                    {/* @if (tesPriceError) {
                    <p className="error">
                        {{ testPriceErrorMessage }}
                    </p>
                    } */}
                </div>
                <div className="new-bike-image">
                    <label htmlFor="imageUrl">imageUrl<span className="red">*</span></label>
                    <textarea type="text" id="imageUrl" rows="1" {...register('imageUrl')}></textarea>
                    {/* @if (imageError) {
                    <p className="error">
                        {{ imageErrorMessage }}
                    </p>
                    } */}
                </div>
                <div className="new-bike-buttons">
                    <button type="button" className="cancel">Cancel</button>
                    <button type="submit" className="add-new">Add</button>    
                </div>
            </form>
        </div>
    );
}
