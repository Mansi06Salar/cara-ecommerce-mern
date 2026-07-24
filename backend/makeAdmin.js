const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");


// ========================================
// MAKE USER ADMIN
// ========================================

async function makeAdmin() {

    try {

        // Get email from terminal command
        const email =
            process.argv[2];


        // ========================================
        // VALIDATION
        // ========================================

        if (!email) {

            console.log(
                "Please provide the user's email."
            );

            console.log(
                "Example: node makeAdmin.js user@example.com"
            );

            return;
        }


        if (!process.env.MONGO_URI) {

            throw new Error(
                "MONGO_URI is missing from .env"
            );

        }


        // ========================================
        // CONNECT TO MONGODB
        // ========================================

        await mongoose.connect(
            process.env.MONGO_URI
        );


        console.log(
            "MongoDB Connected"
        );


        // ========================================
        // FIND USER
        // ========================================

        const user =
            await User.findOne({

                email:
                    email.toLowerCase().trim()

            });


        if (!user) {

            console.log(
                `User not found: ${email}`
            );

            console.log(
                "Register this user first, then run the command again."
            );

            return;
        }


        // ========================================
        // CHECK EXISTING ROLE
        // ========================================

        if (user.role === "admin") {

            console.log(
                `${user.email} is already an admin.`
            );

            return;
        }


        // ========================================
        // CHANGE ROLE
        // ========================================

        user.role = "admin";

        await user.save();


        console.log(
            `${user.email} is now an admin.`
        );


    } catch (error) {

        console.error(
            "Error:",
            error.message
        );


        process.exitCode = 1;


    } finally {

        // Close MongoDB connection
        if (
            mongoose.connection.readyState !== 0
        ) {

            await mongoose.connection.close();

            console.log(
                "MongoDB connection closed."
            );

        }

    }

}


// ========================================
// RUN
// ========================================

makeAdmin();