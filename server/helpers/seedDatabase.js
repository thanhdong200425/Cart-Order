import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import dotenv from "dotenv";

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
