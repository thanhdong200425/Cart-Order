import User from "../models/User.js";

export async function createUser(userData) {
    const newUser = new User(userData);
    return await newUser.save();
}
// Get all information of a user exclue password
export async function getUserById(userId) {
    return await User.findById(userId).select("-password");
}
