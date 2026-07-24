const express = require("express");

const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


// ========================================
// GET LOGGED-IN USER'S CART
// ========================================

router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate(
      "items.product",
      "name category price image stock"
    );

    if (!cart) {
      return res.status(200).json({
        user: req.user._id,
        items: [],
      });
    }

    res.status(200).json(cart);

  } catch (error) {
    console.error(
      "Get cart error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to get cart",
    });
  }
});


// ========================================
// ADD PRODUCT TO CART
// ========================================

router.post("/add", protect, async (req, res) => {
  try {
    const { productId, quantity = 1, size = "" } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    const parsedQuantity = Number(quantity);

    if (
      !Number.isInteger(parsedQuantity) ||
      parsedQuantity < 1
    ) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (parsedQuantity > product.stock) {
      return res.status(400).json({
        message: "Requested quantity exceeds available stock",
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.size === size
    );

    if (existingItem) {
      const newQuantity =
        existingItem.quantity + parsedQuantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          message: "Requested quantity exceeds available stock",
        });
      }

      existingItem.quantity = newQuantity;

    } else {
      cart.items.push({
        product: productId,
        quantity: parsedQuantity,
        size,
      });
    }

    await cart.save();

    await cart.populate(
      "items.product",
      "name category price image stock"
    );

    res.status(200).json({
      message: "Product added to cart",
      cart,
    });

  } catch (error) {
    console.error(
      "Add to cart error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to add product to cart",
    });
  }
});


// ========================================
// UPDATE CART ITEM QUANTITY
// ========================================

router.put("/update", protect, async (req, res) => {
  try {
    const { productId, quantity, size = "" } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    const parsedQuantity = Number(quantity);

    if (
      !Number.isInteger(parsedQuantity) ||
      parsedQuantity < 1
    ) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (parsedQuantity > product.stock) {
      return res.status(400).json({
        message: "Requested quantity exceeds available stock",
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const cartItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.size === size
    );

    if (!cartItem) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    cartItem.quantity = parsedQuantity;

    await cart.save();

    await cart.populate(
      "items.product",
      "name category price image stock"
    );

    res.status(200).json({
      message: "Cart quantity updated",
      cart,
    });

  } catch (error) {
    console.error(
      "Update cart error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to update cart",
    });
  }
});


// ========================================
// REMOVE PRODUCT FROM CART
// ========================================

router.delete("/remove", protect, async (req, res) => {
  try {
    const { productId, size = "" } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.size === size
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();

    await cart.populate(
      "items.product",
      "name category price image stock"
    );

    res.status(200).json({
      message: "Product removed from cart",
      cart,
    });

  } catch (error) {
    console.error(
      "Remove from cart error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to remove product from cart",
    });
  }
});


module.exports = router;