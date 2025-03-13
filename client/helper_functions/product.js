import axios from "axios";
import {SERVER_URL} from "../config.js";

export const getProductById = async (productId) => {
    try {
        const response = await axios.get(SERVER_URL + "/product/" + productId);
        if (response.status === 200) return response.data.data;
    } catch (e) {
        console.log("Error in getProductById(): " + e);
        return null;
    }
}