const express = require("express");

const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


// ========================================
// CHECKOUT / CREATE ORDER
// ========================================

router.post("/checkout", protect, async (req, res) => {
  try {

    // Find logged-in user's cart
    const cart = await Cart.findOne({
      user: req.user._id,
    });


    // Cart does not exist or is empty
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }


    const orderItems = [];

    let totalAmount = 0;


    // ========================================
    // VERIFY EVERY CART ITEM
    // ========================================

    for (const item of cart.items) {

      const product = await Product.findById(
        item.product
      );


      if (!product) {
        return res.status(404).json({
          message:
            "One of the products in your cart no longer exists",
        });
      }


      // Check current stock
      if (item.quantity > product.stock) {
        return res.status(400).json({
          message:
            `Not enough stock available for ${product.name}`,
        });
      }


      // Calculate using database price
      const itemTotal =
        product.price * item.quantity;


      totalAmount += itemTotal;


      // Store snapshot of product
      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
        size: item.size,
      });

    }


    // ========================================
    // CREATE ORDER
    // ========================================

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      status: "Placed",
    });


    // ========================================
    // REDUCE STOCK
    // ========================================

    for (const item of cart.items) {

      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock: -item.quantity,
          },
        }
      );

    }


    // ========================================
    // CLEAR CART
    // ========================================

    cart.items = [];

    await cart.save();


    // ========================================
    // RESPONSE
    // ========================================

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });


  } catch (error) {

    console.error(
      "Checkout error:",
      error.message
    );


    res.status(500).json({
      message: "Failed to place order",
    });

  }
});


// ========================================
// GET LOGGED-IN USER'S ORDERS
// ========================================

router.get("/", protect, async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.user._id,
    })
      .sort({
        createdAt: -1,
      });


    res.status(200).json({
      orders,
    });


  } catch (error) {

    console.error(
      "Get orders error:",
      error.message
    );


    res.status(500).json({
      message: "Failed to fetch orders",
    });

  }

});


module.exports = router;