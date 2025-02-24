import User from "../models/User.js";

export async function createUser(userData) {
    const newUser = new User(userData);
    return await newUser.save();
}
