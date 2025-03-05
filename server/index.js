import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import { validateOrigin, validateRequest } from "./helpers/checkRequest.js";
import { createUser } from "./repository/UserRepository.js";
import { hashPassword, verifyPassword } from "./helpers/handlePassword.js";
import User from "./models/User.js";
import Product from "./models/Product.js";

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

app.post("/sign-in", async (req, res) => {
    const validationError = validateRequest(req.body);
    console.log(validationError, req.body);
    if (validationError.length > 0) return res.status(400).json({ validationError });
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found!" });
        const isMatch = await verifyPassword(email, password);
        if (!isMatch) return res.status(404).json({ error: "Password isn't correct" });

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
            return res.status(404).json({
                error: "Email already was used",
            });
        return res.status(200).json({ message: "OK" });
    } catch (error) {
        console.log("Error in check-email route: " + error);
        return res.status(500).json({ error: error.message });
    }
});

app.get("/", async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1,
            limit = parseInt(req.query.limit) || 20,
            skipList = (page - 1) * limit,
            sortField = req.query.sortField || "price",
            sortOrder = req.query.sortOrder === "lowest" ? 1 : -1;

        const filterQuery = {};
        const sortOption = {
            [sortField]: sortOrder,
        };

        if (req.query.category && req.query.category !== "all") filterQuery.category = req.query.category;

        // Only initialize the price whenever price exists
        if (req.query.price && req.query.price !== "all") {
            const priceRanges = {
                "below $200": { price: { $lt: 200 } },
                "from $200 to $400": { price: { $gte: 200, $lte: 400 } },
                "from $400 to $800": { price: { $gte: 400, $lte: 800 } },
                "from $800 to $2000": { price: { $gte: 800, $lte: 2000 } },
                "above $2000": { price: { $gt: 2000 } },
            };
            const prices = Array.isArray(req.query.price) ? req.query.price : [req.query.price];
            const priceQueries = prices.filter((price) => price !== "all" && priceRanges[price]).map((price) => priceRanges[price]);
            if (priceQueries.length > 0) filterQuery.$or = priceQueries;
        }

        const productList = await Product.find(filterQuery).skip(skipList).sort(sortOption).limit(limit);
        const totalProducts = await Product.countDocuments(filterQuery);

        return res.status(200).json({
            productList,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            isHasMore: page < Math.ceil(totalProducts / limit),
        });
    } catch (error) {
        console.log("Error in / route: " + error);
        return res.status(500).json({ error: "Failed to fetch products!" });
    }
});

app.get("/get-category", async (req, res) => {
    try {
        const categoryList = await Product.distinct("category");
        return res.status(200).json({ categoryList });
    } catch (error) {
        console.log("Error in get-category route: " + error);
        return res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
