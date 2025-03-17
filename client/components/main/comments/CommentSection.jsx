import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { getCommentsByProductId, addComment } from "../../../helper_functions/comments";
import { toast } from "react-toastify";

const CommentSection = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalComments: comments.length,
    });

    // Fetch comments when component mounts or productId changes
    useEffect(() => {
        const fetchComments = async () => {
            if (!productId) return;

            setIsLoading(true);
            try {
                const data = await getCommentsByProductId(productId, pagination.currentPage);
                setComments(data.comments);
                setPagination(data.pagination);
            } catch (error) {
                toast.error("Failed to load comments");
                console.error("Error fetching comments:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComments();
    }, [productId, pagination.currentPage]);

    const handleAddComment = async (commentData) => {
        try {
            const result = await addComment(productId, commentData);
            setComments((prevComments) => [result.comment, ...prevComments]);
            setPagination((prev) => ({
                ...prev,
                totalComments: prev.totalComments + 1,
            }));
            toast.success("Comment added successfully");
        } catch (error) {
            toast.error("Failed to add comment");
            console.error("Error adding comment:", error);
        }
    };

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: newPage,
        }));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 my-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>

            <CommentForm onAddComment={handleAddComment} />

            <div className="mt-8">
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                    </div>
                ) : comments.length > 0 ? (
                    <>
                        <CommentList comments={comments} />

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="mt-6 flex justify-center">
                                <nav className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                        disabled={pagination.currentPage === 1}
                                        className="px-3 py-1 rounded-md border border-gray-300 
                              disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>

                                    <div className="text-sm text-gray-700">
                                        Page {pagination.currentPage} of {pagination.totalPages}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                        disabled={pagination.currentPage === pagination.totalPages}
                                        className="px-3 py-1 rounded-md border border-gray-300 
                              disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </nav>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-10 text-gray-500">No reviews yet. Be the first to leave a review!</div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
