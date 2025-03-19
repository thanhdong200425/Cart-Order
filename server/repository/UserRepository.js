import User from "../models/User.js";

export async function createUser(userData) {
    const newUser = new User(userData);
    return await newUser.save();
}
// Get all information of a user exclue password
export async function getUserById(userId) {
    return await User.findById(userId).select("-password");
}

export async function getCart(userId) {
    try {
        const user = await User.findById(userId).select("cart");
        return user.cart || [];
    } catch (e) {
        console.log("Error in getCart(): " + e);
        throw e;
    }
}

export async function saveCart(userId, cartItems) {
    try {
        await User.findByIdAndUpdate(userId, { cart: cartItems });
        return true;
    } catch (e) {
        console.log("Error in saveCart(): " + e);
        throw e;
    }
}
