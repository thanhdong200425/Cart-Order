import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import { validateOrigin, validateRequest } from "./helpers/checkRequest.js";
import { createUser } from "./repository/UserRepository.js";
import { hashPassword, verifyPassword } from "./helpers/handlePassword.js";
import User from "./models/User.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// Create a middleware to only allow request from server that has port: 5173
app.use((req, res, next) => {
    console.log(req.headers.origin);
    if (req.headers.origin && validateOrigin(req)) return next();
    return res.status(400).json({ error: "Your domain is not allowed" });
});

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post("/sign-in", async (req, res) => {
    const validationError = validateRequest(req.body);
    console.log(validationError, req.body);
    if (validationError.length > 0) return res.status(400).json({ validationError });
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found!" });
        const isMatch = await verifyPassword(email, password);
        if (!isMatch) return res.status(400).json({ error: "Password isn't correct" });

        return res.status(200).json({ user });
    } catch (error) {
        console.log("Error in sign-in route!");
        return res.status(500).json({ error });
    }
});

app.post("/sign-up", async (req, res) => {
    // Validate the request to check whether any field is empty or not
    const validationError = validateRequest(req.body);
    if (validationError.length > 0)
        return res.status(400).json({
            validationError,
        });

    // Create a new user if no error is found
    const { email, name, password } = req.body;
    const hashedPassword = await hashPassword(password);
    try {
        const newUser = await createUser({
            name,
            email,
            password: hashedPassword,
        });
        return res.status(200).json({ user: newUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.post("/check-email", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: "Email is required" });
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({
                error: "Email already was used",
            });
        return res.status(200).json({ message: "OK" });
    } catch (error) {
        console.log("Error in check-email route: " + error);
        return res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
