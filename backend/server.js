const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


// ========================================
// ROUTES
// ========================================

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");


// ========================================
// EXPRESS APP
// ========================================

const app = express();


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());

app.use(express.json());


// ========================================
// TEST ROUTE
// ========================================

app.get("/", (req, res) => {

  res.send("Backend Running");

});


// ========================================
// API ROUTES
// ========================================


// Products
app.use(
  "/api/products",
  productRoutes
);


// Authentication
app.use(
  "/api/auth",
  authRoutes
);


// Cart
app.use(
  "/api/cart",
  cartRoutes
);


// Orders
app.use(
  "/api/orders",
  orderRoutes
);


// Admin
app.use(
  "/api/admin",
  adminRoutes
);


// ========================================
// PORT
// ========================================

const PORT =
  process.env.PORT || 5000;


// ========================================
// MONGODB CONNECTION
// ========================================

mongoose
  .connect(
    process.env.MONGO_URI
  )

  .then(() => {

    console.log(
      "MongoDB Connected"
    );


    app.listen(
      PORT,
      () => {

        console.log(
          `Server running on port ${PORT}`
        );

      }
    );

  })

  .catch((error) => {

    console.error(
      "MongoDB Connection Error:",
      error.message
    );

  });