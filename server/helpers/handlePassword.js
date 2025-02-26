import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Error when hash the password: " + error);
    }
};

export const verifyPassword = async (email, enterPassword) => {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");
        return await bcrypt.compare(enterPassword, user.password);
    } catch (error) {
        console.log("Error in verify-password: " + error);
        return false;
    }
};
