//import { useState } from "react";
//import request from "../../../utils/request";
import { useParams } from "react-router";
import useRequest from "../../../../bin/useRequest";
import useForm from "../../../hooks/useForm";

export default function CreateComent({
    user,
    onCreate
}) {   
    const {bikeId} = useParams();
    //const [comment, setComment] = useState('');
    const {request} = useRequest();

    // const changeHandler = (e) => {
    //     setComment(e.target.value);
    // };

    const submitHandler = async ({comment}) => { console.log(user.email, comment, bikeId);
        try {
            await request('/data/comments', 'POST', {
            //author: user.email,
            message: comment,
            bikeId
        });

        //setComment('');
        onCreate();

        } catch (error) {
            alert(error.message);
        }
      
    }

    const {
        register,
        formAction
    } = useForm(submitHandler, {
        comment: ''
    });


    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action = {formAction}>
                <textarea 
                {...register('comment')}
                placeholder="Comment......"
                ></textarea>
                <input 
                    className="details-button" 
                    type="submit" 
                    value="Comment"
                    disabled={!user}
                />
            </form>
        </article>
    );
}