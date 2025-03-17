import { formatDistanceToNow } from "date-fns";

const CommentItem = ({ comment }) => {
    const formattedDate = comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) : "Just now";

    // Get initials from name for avatar
    const getInitials = (name) => {
        return name
            ? name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()
                  .substring(0, 2)
            : "?";
    };

    const starRating = (rating) => {
        return Array(5)
            .fill(0)
            .map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ));
    };

    return (
        <div className="flex space-x-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200">
            {/* Avatar */}
            <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">{getInitials(comment.user?.name)}</div>
            </div>

            {/* Comment content */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <div>
                        <h4 className="font-semibold text-gray-900">{comment.user?.name || "Anonymous"}</h4>
                        <div className="flex items-center mt-1">
                            <div className="flex">{starRating(comment.rating)}</div>
                            <span className="ml-2 text-sm text-gray-500">{formattedDate}</span>
                        </div>
                    </div>
                </div>

                <p className="mt-2 text-gray-700 whitespace-pre-line">{comment.content}</p>
            </div>
        </div>
    );
};

export default CommentItem;
