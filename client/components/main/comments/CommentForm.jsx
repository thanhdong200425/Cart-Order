import { useState, useContext } from "react";
import { toast } from "react-toastify";
import InfoUserContext from "../../../context/InfoContext";
import { useNavigate } from "react-router-dom";

const CommentForm = ({ onAddComment }) => {
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [infoUser] = useContext(InfoUserContext);
    const navigate = useNavigate();

    // Get user ID from localStorage (this assumes you store user data in localStorage after login)
    const getUserId = () => {
        const userData = localStorage.getItem("userData");
        if (!userData) return null;

        try {
            return JSON.parse(userData)._id;
        } catch (error) {
            console.error("Error parsing user data:", error);
            return null;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userId = getUserId();

        if (!userId) {
            toast.info("Please sign in to leave a review");
            navigate("/sign-in");
            return;
        }

        if (!content.trim()) {
            toast.error("Please enter a comment");
            return;
        }

        setIsSubmitting(true);

        onAddComment({ userId, content, rating })
            .then(() => {
                setContent("");
                setRating(5);
            })
            .catch((error) => {
                console.error("Error submitting comment:", error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Write a Review</h3>

            <form onSubmit={handleSubmit}>
                {/* Rating selector */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none" aria-label={`Rate ${star} stars`}>
                                <svg className={`w-6 h-6 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comment text area */}
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review
                    </label>
                    <textarea id="comment" rows="4" value={content} onChange={(e) => setContent(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Share your experience with this product..."></textarea>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isSubmitting || !content.trim()}
                    className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                    transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        </span>
                    ) : (
                        "Submit Review"
                    )}
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
