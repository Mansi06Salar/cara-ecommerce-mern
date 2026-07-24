const express = require("express");
const Product = require("../models/Product");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();


// ========================================
// GET ALL PRODUCTS
// Public
// ========================================

router.get("/", async (req, res) => {

  try {

    const products =
      await Product.find().sort({
        createdAt: -1,
      });

    res.status(200).json(products);

  } catch (error) {

    console.error(
      "Error fetching products:",
      error.message
    );

    res.status(500).json({
      message: "Failed to fetch products",
    });

  }

});


// ========================================
// GET ONE PRODUCT
// Public
// ========================================

router.get("/:id", async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );


    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });

    }


    res.status(200).json(product);

  } catch (error) {

    console.error(
      "Error fetching product:",
      error.message
    );

    res.status(400).json({
      message: "Invalid product ID",
    });

  }

});


// ========================================
// CREATE PRODUCT
// Admin only
// ========================================

router.post(
  "/",
  protect,
  admin,
  async (req, res) => {

    try {

      const {
        name,
        category,
        price,
        description,
        image,
        stock,
      } = req.body;


      if (
        !name ||
        !category ||
        price === undefined ||
        !image ||
        stock === undefined
      ) {

        return res.status(400).json({
          message:
            "Name, category, price, image and stock are required.",
        });

      }


      if (
        Number(price) < 0 ||
        Number(stock) < 0
      ) {

        return res.status(400).json({
          message:
            "Price and stock cannot be negative.",
        });

      }


      const product =
        await Product.create({

          name,

          category,

          price: Number(price),

          description:
            description || "",

          image,

          stock: Number(stock),

        });


      res.status(201).json({
        message:
          "Product created successfully",

        product,
      });


    } catch (error) {

      console.error(
        "Error creating product:",
        error.message
      );


      res.status(400).json({
        message:
          "Failed to create product",
        error: error.message,
      });

    }

  }
);


// ========================================
// UPDATE PRODUCT
// Admin only
// ========================================

router.put(
  "/:id",
  protect,
  admin,
  async (req, res) => {

    try {

      const {
        name,
        category,
        price,
        description,
        image,
        stock,
      } = req.body;


      if (
        price !== undefined &&
        Number(price) < 0
      ) {

        return res.status(400).json({
          message:
            "Price cannot be negative.",
        });

      }


      if (
        stock !== undefined &&
        Number(stock) < 0
      ) {

        return res.status(400).json({
          message:
            "Stock cannot be negative.",
        });

      }


      const product =
        await Product.findById(
          req.params.id
        );


      if (!product) {

        return res.status(404).json({
          message:
            "Product not found",
        });

      }


      if (name !== undefined)
        product.name = name;

      if (category !== undefined)
        product.category = category;

      if (price !== undefined)
        product.price = Number(price);

      if (description !== undefined)
        product.description = description;

      if (image !== undefined)
        product.image = image;

      if (stock !== undefined)
        product.stock = Number(stock);


      await product.save();


      res.status(200).json({
        message:
          "Product updated successfully",

        product,
      });


    } catch (error) {

      console.error(
        "Error updating product:",
        error.message
      );


      res.status(400).json({
        message:
          "Failed to update product",
        error: error.message,
      });

    }

  }
);


// ========================================
// DELETE PRODUCT
// Admin only
// ========================================

router.delete(
  "/:id",
  protect,
  admin,
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        );


      if (!product) {

        return res.status(404).json({
          message:
            "Product not found",
        });

      }


      await product.deleteOne();


      res.status(200).json({
        message:
          "Product deleted successfully",
      });


    } catch (error) {

      console.error(
        "Error deleting product:",
        error.message
      );


      res.status(400).json({
        message:
          "Failed to delete product",
        error: error.message,
      });

    }

  }
);


module.exports = router;