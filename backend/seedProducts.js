const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");


// ========================================
// SAMPLE CARA PRODUCTS
// ========================================

const products = [

    {
        name: "Cartoon Astronaut Shirts",
        category: "Men",
        price: 78,
        description:
            "Casual printed shirt from the CARA summer collection.",
        image: "Images/f_1.jpg",
        stock: 20
    },

    {
        name: "MILDIN Printed Spread Collar Shirt",
        category: "Men",
        price: 70,
        description:
            "Regular fit printed spread collar casual shirt.",
        image: "Images/f_2.jpg",
        stock: 20
    },

    {
        name: "HIGHLANDER Printed Shirt",
        category: "Men",
        price: 80,
        description:
            "Regular fit printed spread collar shirt.",
        image: "Images/f_3.jpg",
        stock: 20
    },

    {
        name: "Adidas Casual Printed Shirt",
        category: "Men",
        price: 77,
        description:
            "Casual printed shirt with a modern summer design.",
        image: "Images/f_4 (1).jpg",
        stock: 20
    },

    {
        name: "Majestic Man Casual Shirt",
        category: "Men",
        price: 82,
        description:
            "Men regular fit printed spread collar casual shirt.",
        image: "Images/f_5.jpg",
        stock: 20
    },

    {
        name: "Roadster Printed Casual Shirt",
        category: "Men",
        price: 86,
        description:
            "Men tailored fit printed casual shirt.",
        image: "Images/f_6.jpg",
        stock: 20
    },

    {
        name: "VEDANA Cotton Blend Trousers",
        category: "Women",
        price: 70,
        description:
            "Women regular cotton blend trousers.",
        image: "Images/f_7.jpg",
        stock: 20
    },

    {
        name: "Herway Printed Women Top",
        category: "Women",
        price: 65,
        description:
            "Casual regular sleeves printed women's top.",
        image: "Images/f_8.jpg",
        stock: 20
    },

    {
        name: "New Arrival Astronaut Shirt",
        category: "Men",
        price: 78,
        description:
            "New arrival casual shirt from the CARA collection.",
        image: "Images/n1.jpg",
        stock: 20
    },

    {
        name: "MILDIN New Arrival Shirt",
        category: "Men",
        price: 70,
        description:
            "Regular fit new arrival printed shirt.",
        image: "Images/n2.jpg",
        stock: 20
    },

    {
        name: "HIGHLANDER New Arrival Shirt",
        category: "Men",
        price: 80,
        description:
            "Modern printed shirt from the new arrivals collection.",
        image: "Images/n3.jpg",
        stock: 20
    },

    {
        name: "Adidas New Arrival Shirt",
        category: "Men",
        price: 77,
        description:
            "Casual new arrival shirt with modern printed design.",
        image: "Images/n4.jpg",
        stock: 20
    },

    {
        name: "Majestic Man New Arrival Shirt",
        category: "Men",
        price: 82,
        description:
            "Regular fit casual shirt from the new arrivals collection.",
        image: "Images/n5.jpg",
        stock: 20
    },

    {
        name: "Roadster Casual Shorts",
        category: "Men",
        price: 86,
        description:
            "Men tailored fit casual shorts.",
        image: "Images/n6.jpg",
        stock: 20
    },

    {
        name: "VEDANA Cotton Blend Shirt",
        category: "Men",
        price: 70,
        description:
            "Men regular cotton blend casual shirt.",
        image: "Images/n7.jpg",
        stock: 20
    },

    {
        name: "Herway Printed Men Shirt",
        category: "Men",
        price: 65,
        description:
            "Casual regular sleeves printed men's shirt.",
        image: "Images/n8.jpg",
        stock: 20
    }

];



// ========================================
// SEED PRODUCTS
// ========================================

async function seedProducts() {

    try {

        // Check environment variable
        if (!process.env.MONGO_URI) {

            throw new Error(
                "MONGO_URI is missing from .env"
            );

        }


        // Connect to MongoDB
        await mongoose.connect(
            process.env.MONGO_URI
        );


        console.log(
            "MongoDB Connected"
        );


        let addedProducts = 0;

        let skippedProducts = 0;


        // Add only products that don't exist
        for (const productData of products) {

            const existingProduct =
                await Product.findOne({
                    name: productData.name
                });


            if (existingProduct) {

                console.log(
                    `Skipped: ${productData.name}`
                );

                skippedProducts++;

                continue;

            }


            await Product.create(
                productData
            );


            console.log(
                `Added: ${productData.name}`
            );


            addedProducts++;

        }


        console.log(
            "\n=============================="
        );

        console.log(
            "Product seeding completed!"
        );

        console.log(
            `Added: ${addedProducts}`
        );

        console.log(
            `Skipped: ${skippedProducts}`
        );

        console.log(
            "=============================="
        );


    } catch (error) {

        console.error(
            "Seed Error:",
            error.message
        );


        process.exitCode = 1;


    } finally {

        await mongoose.connection.close();

        console.log(
            "MongoDB connection closed."
        );

    }

}


// ========================================
// RUN
// ========================================

seedProducts();