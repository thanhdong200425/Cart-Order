import axios from "axios";
import { SERVER_URL } from "../config.js";

export const getCommentsByProductId = async (productId, page = 1, limit = 5) => {
    try {
        const response = await axios.get(`${SERVER_URL}/product/${productId}/comments?page=${page}&limit=${limit}`);

        return {
            comments: response.data.comments,
            pagination: response.data.pagination,
        };
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
};

export const addComment = async (productId, commentData) => {
    try {
        const response = await axios.post(`${SERVER_URL}/product/${productId}/comments`, commentData);

        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};
