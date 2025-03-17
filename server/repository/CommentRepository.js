import Comment from "../models/Comment.js";

export async function getCommentsByProductId(productId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const comments = await Comment.find({ productId }).sort({ createdAt: -1 }).skip(skip).limit(limit);

    const totalComments = await Comment.countDocuments({ productId });

    return {
        comments,
        totalPages: Math.ceil(totalComments / limit),
        currentPage: page,
        totalComments,
    };
}

export async function createComment(commentData) {
    const newComment = new Comment(commentData);
    return await newComment.save();
}
