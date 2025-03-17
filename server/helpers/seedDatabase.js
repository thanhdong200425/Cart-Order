import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import dotenv from "dotenv";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

dotenv.config({ path: "../.env" });

const generateFakeProducts = async (quantity) => {
    return Array.from({ length: quantity }, () => {
        const randomImageQuantity = faker.number.int({ min: 2, max: 5 });
        const images = Array.from({ length: randomImageQuantity }, () => faker.image.urlPicsumPhotos());

        return {
            name: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price({ min: 1, max: 5000, dec: 0 })),
            category: faker.commerce.department(),
            description: faker.commerce.productDescription(),
            stock: faker.number.int({ min: 0, max: 1000 }),
            image: images[0],
            list_image: images,
        };
    });
};

const getRandomId = async (model) => {
    const count = await model.countDocuments();
    if (count === 0) return null;

    const random = Math.floor(Math.random() * count);
    const document = await model.findOne().skip(random);
    return document?._id;
};

const generateFakeComments = async (quantity) => {
    const users = await User.find();
    const products = await Product.find();

    if (users.length === 0 || products.length === 0) {
        console.log("No users or products found for generating comments");
        return [];
    }

    return Promise.all(
        Array.from({ length: quantity }, async () => {
            // Get a random user and product
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomProduct = products[Math.floor(Math.random() * products.length)];

            return {
                userId: randomUser._id,
                productId: randomProduct._id,
                content: faker.lorem.sentence(),
                rating: faker.number.int({ min: 1, max: 5 }),
            };
        })
    );
};

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected correctly to server");

        await Product.deleteMany({});
        console.log("Previous products were deleted");

        const dummyProductList = await generateFakeProducts(30000);
        console.log(`${dummyProductList.length} were generated!`);

        const insertedProducts = await Product.insertMany(dummyProductList);
        console.log(`${insertedProducts.length} were inserted!`);

        await Comment.deleteMany({});
        console.log("Previous comments were deleted");

        const dummyCommentList = await generateFakeComments(30000);
        console.log(`${dummyCommentList.length} were generated!`);

        const insertedComments = await Comment.insertMany(dummyCommentList);
        console.log(`${insertedComments.length} were inserted!`);
    } catch (error) {
        console.log("Error in seedDB: ", error);
    } finally {
        console.log("Database connection closed");
        await mongoose.connection.close();
    }
};

seedDB().then(() => {
    console.log("Seeding completed");
});
