import useForm from "../../../hooks/useForm";
import { v4 as uuid } from 'uuid';

export default function CreateComent({
    user,
    onCreated,
    bikeId
}) {
    const submitHandler = async ({ comment }) => {
        const newComment = {
            _id: uuid(),
            data: {
                message: comment,
                bikeId,
                user
            }
        };

        if (newComment.data.message.length < 4) {
            return alert('Message should be 4 symbols at least!');
        }

        onCreated(newComment);

        // eslint-disable-next-line react-hooks/immutability
        reset();
    }


    const {
        register,
        formAction,
        reset,
    } = useForm(submitHandler, {
        comment: '',
    });



    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action={formAction}>
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