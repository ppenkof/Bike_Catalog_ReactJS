import { useParams } from "react-router";
import useRequest from "../../../../bin/useRequest";

export default function DetailsComments(
    //{
    //refresh
    //}
) {
    const {bikeId} = useParams();
    const urlParams = new URLSearchParams({
        where: `bikeId="${bikeId}"`,
        load: `author=_ownerId:users`,
    });
    
    const {data: comments} = useRequest(`/data/comments?${urlParams.toString()}`, []);

    //to do refresh when new comment is added
    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                {comments.map(comment => (
                   <li key={comment._id} className="comment">
                    <p>{comment.author?.email}: {comment.message}</p>
                    </li> 
                ))}
                
            </ul>
            {comments.length === 0 && (
                <p className="no-comment">No comments.</p> 
            )}
    </div>
    );
}
