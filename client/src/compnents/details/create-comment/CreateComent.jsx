import { useParams } from "react-router";
import useForm from "../../../hooks/useForm";
import { v4 as uuid } from 'uuid';
import useRequest from "../../../hooks/useRequest";

export default function CreateComent({
    user,
    onBegin,
    onCreated
}) {   
    const {bikeId} = useParams();
    const {request} = useRequest();

    const submitHandler = async ({comment}) => { 
        const data = {
            _id: uuid(),
            message: comment,
            bikeId,
            user
        };

        onBegin(data);

        if (data.message.length < 4 ) {
            return alert('Message should be 4 symbols at least!');
        }

        try {
            const addedComments = await request('/data/comments', 'POST', {
            data
        });

        onCreated(addedComments);

        } catch (error) {
            alert(error.message);
        }
      
    }

    const {
        register,
        formAction
    } = useForm(submitHandler, {
        comment: '',

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
                    className="button" 
                    type="submit" 
                    value="Comment"
                    disabled={!user}
                />
            </form>
        </article>
    );
}