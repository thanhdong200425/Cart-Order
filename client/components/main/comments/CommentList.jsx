import CommentItem from "./CommentItem";

const CommentList = ({ comments }) => {
    return (
        <div className="space-y-6">
            {comments.map((comment, index) => (
                <CommentItem key={comment._id || index} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;
