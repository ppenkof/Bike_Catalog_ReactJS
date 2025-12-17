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

        if (values.name.length <= 3) {
            return alert('Name is too short!');
        }

        if (values.description.length <= 25) {
            return alert('Description should 25 symbols at least!');
        }

        if (values.type.length <= 2) {
            return alert('Type is too short!');
        }

        if (values.price <= 0) {
            return alert('Price must be more than 0!');
        }

        if (values.imageUrl.length < 10) {
            return alert('Image adress is too short - 10 symbols at least!');
        }

        try {
            await request('/data/bikes', 'POST', data);

            navigate('/bikes');
        } catch (err) {
            alert(err.message)
        }
    }

    const onCatalog = () => {
        navigate('/');
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
        <div className="new-bike-border">
            <div className="header-background">
                <span>New bike</span>
            </div>
            <form id="add-new-game" action={formAction}>
                <div className="new-bike-name">
                    <label htmlFor="bikeName">bike name <span className="red">*</span></label>
                    <input type="text" id="bikeName" {...register('name')} />
                </div>
                <div className="new-bike-content">
                    <label htmlFor="descriptionText">description <span className="red">*</span></label>
                    <textarea type="text" id="descriptionText" rows="2" {...register('description')}></textarea>
                </div>
                <div className="new-bike-type">
                    <label htmlFor="typeText">type <span className="red">*</span></label>
                    <textarea type="text" id="typeText" rows="1" {...register('type')}></textarea>
                </div>
                <div className="new-bike-price">
                    <label htmlFor="priceValue">price <span className="red">*</span></label>
                    <textarea type="text" id="priceValue" rows="1" {...register('price')}></textarea>
                </div>
                <div className="new-bike-image">
                    <label htmlFor="imageUrl">imageUrl<span className="red">*</span></label>
                    <textarea type="text" id="imageUrl" rows="1" {...register('imageUrl')}></textarea>
                </div>
                <div className="new-bike-buttons">
                    <button type="button" className="cancel" onClick={onCatalog}>Cancel</button>
                    <button type="submit" className="add-new">Add</button>
                </div>
            </form>
        </div>
    );
}
