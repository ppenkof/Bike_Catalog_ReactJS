export default function DetailsComments({
    comments,
}) {
     
    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                {comments.map(comment => (
                    <li style={comment.pending ? {color: 'gray'} : {}} key={comment._id} className="comment">
                        <p>{comment.data?.user?.email}: {comment.data.message}</p>
                    </li>
                ))}
            </ul>

            {comments.length === 0 && (
                <p className="no-comment">No comments.</p>
            )}
        </div>
    );
}
