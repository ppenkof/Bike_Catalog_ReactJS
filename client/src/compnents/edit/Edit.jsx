import { useNavigate, useParams } from "react-router";
import useRequest from "../../hooks/useRequest";
import useForm from "../../hooks/useForm";
import { useEffect } from "react";


export default function Edit() {
    const navigate = useNavigate();
    const { bikeId } = useParams();
    const { request } = useRequest();

    const editGameHandler = async (values) => {
         values.price = Number(values.price);
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

     useEffect(() => {
        request(`/data/bikes/${bikeId}`)
            .then(result => {
                setValues(result);
            })
            .catch(err => {
                alert(err.message);
            })
    }, [bikeId, setValues]);

    const onDetails = () => {
        navigate(`/bikes/${bikeId}/details`);
    } 


    return (
        <div className="new-bike-border">
            <div className="header-background">
                <span>Edit bike</span>
            </div>
            <form id="new-bike" action={formAction}>
                <div className="new-bike-name">
                    <label htmlFor="bikeName">bike name <span className="red">*</span></label>
                    <input type="text" id="bikeName" {...register('name')}/>
                </div>
                <div className="new-bike-content">
                    <label htmlFor="descriptionText">description <span className="red">*</span></label>
                    <textarea type="text" id="descriptionText" rows="2"  {...register('description')}></textarea>
                </div>
                <div className="new-bike-type">
                    <label htmlFor="typeText">type <span className="red">*</span></label>
                    <textarea type="text" id="typeText" rows="1" {...register('type')}></textarea>
                </div>
                <div className="new-bike-price">
                    <label htmlFor="priceValue">price <span className="red">*</span></label>
                    <textarea type="text" id="priceValue" rows="1"  {...register('price')}></textarea>
                </div>
                <div className="new-bike-image">
                    <label htmlFor="imageUrl">imageUrl<span className="red">*</span></label>
                    <textarea type="text" id="imageUrl" rows="1"  {...register('imageUrl')}></textarea>
                </div>
                <div className="new-bike-buttons">
                    <button type="button" className="cancel" onClick={onDetails}>Cancel</button>
                    <button type="submit" className="add-new">Edit</button>    
                </div>
            </form>
        </div>
    );
}
