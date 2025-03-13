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
// Middleware to validate request origin - only allows requests from port 5173
app.use((req, res, next) => {
    console.log(req.headers.origin);
    if (req.headers.origin && validateOrigin(req)) return next();
    return res.status(400).json({ error: "Your domain is not allowed" });
});

// Route: Authenticate user with email and password
app.post("/sign-in", async (req, res) => {
    // Validate request data for required fields
    const validationError = validateRequest(req.body);
    console.log(validationError, req.body);
    if (validationError.length > 0) return res.status(400).json({ validationError });

    try {
        const { email, password } = req.body;
        // Find user by email in database
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found!" });

        // Verify password matches stored hash
        const isMatch = await verifyPassword(email, password);
        if (!isMatch) return res.status(404).json({ error: "Password isn't correct" });

        // Return user data on successful authentication
        return res.status(200).json({ user });
    } catch (error) {
        console.log("Error in sign-in route!");
        return res.status(500).json({ error });
    }
});

// Route: Register new user with name, email, and password
app.post("/sign-up", async (req, res) => {
    // Validate the request to check whether any field is empty or not
    const validationError = validateRequest(req.body);
    if (validationError.length > 0)
        return res.status(400).json({
            validationError,
        });

    // Create a new user if no error is found
    const { email, name, password } = req.body;
    // Hash password before storing in database
    const hashedPassword = await hashPassword(password);
    try {
        // Create new user in database with hashed password
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

// Route: Check if an email is already registered
app.post("/check-email", async (req, res) => {
    try {
        const { email } = req.body;
        // Ensure email is provided
        if (!email) return res.status(400).json({ error: "Email is required" });

        // Check if email exists in database
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(404).json({
                error: "Email already was used",
            });

        // Return success if email is available
        return res.status(200).json({ message: "OK" });
    } catch (error) {
        console.log("Error in check-email route: " + error);
        return res.status(500).json({ error: error.message });
    }
});

// Route: Get paginated product list with filtering and sorting options
app.get("/", async (req, res) => {
    try {
        // Parse pagination parameters with defaults
        let page = parseInt(req.query.page) || 1,
            limit = parseInt(req.query.limit) || 20,
            skipList = (page - 1) * limit,
            // Parse sorting parameters
            sortField = req.query.sortField || "price",
            sortOrder = req.query.sortOrder === "lowest" ? 1 : -1;

        const filterQuery = {};
        // Setup sort options
        const sortOption = {
            [sortField]: sortOrder,
        };

        // Apply category filter if provided
        if (req.query.category && req.query.category !== "all") filterQuery.category = req.query.category;

        // Apply price range filters if provided
        if (req.query.price && req.query.price !== "all") {
            // Define price range options for filtering
            const priceRanges = {
                "below $200": { price: { $lt: 200 } },
                "from $200 to $400": { price: { $gte: 200, $lte: 400 } },
                "from $400 to $800": { price: { $gte: 400, $lte: 800 } },
                "from $800 to $2000": { price: { $gte: 800, $lte: 2000 } },
                "above $2000": { price: { $gt: 2000 } },
            };
            // Handle single or multiple price range selections
            const prices = Array.isArray(req.query.price) ? req.query.price : [req.query.price];
            // Build MongoDB query for selected price ranges
            const priceQueries = prices.filter((price) => price !== "all" && priceRanges[price]).map((price) => priceRanges[price]);
            // Apply price filters using $or operator if any are selected
            if (priceQueries.length > 0) filterQuery.$or = priceQueries;
        }

        // Query database with filters, pagination and sorting
        const productList = await Product.find(filterQuery).skip(skipList).sort(sortOption).limit(limit);
        // Get total count for pagination information
        const totalProducts = await Product.countDocuments(filterQuery);

        // Return products with pagination metadata
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

// Route: Get unique list of product categories
app.get("/get-category", async (req, res) => {
    try {
        // Query database for distinct categories
        const categoryList = await Product.distinct("category");
        return res.status(200).json({ categoryList });
    } catch (error) {
        console.log("Error in get-category route: " + error);
        return res.status(500).json({ error: error.message });
    }
});

app.get("/product/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findOne({ _id: productId });
        if (!product) return res.status(404).json({ error: "Product not found" });
        return res.status(200).json({ data: product });
    } catch (error) {
        console.log("Error in get specific product route: " + error);
        return res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
