const express = require("express");

const Product = require("../models/Product");
const Order = require("../models/Order");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");


const router = express.Router();


// ========================================
// ADMIN DASHBOARD STATISTICS
// ========================================

router.get(
  "/dashboard",
  protect,
  admin,
  async (req, res) => {

    try {

      const totalProducts =
        await Product.countDocuments();


      const totalOrders =
        await Order.countDocuments();


      const revenueResult =
        await Order.aggregate([
          {
            $match: {
              status: {
                $ne: "Cancelled",
              },
            },
          },

          {
            $group: {
              _id: null,

              totalRevenue: {
                $sum: "$totalAmount",
              },
            },
          },
        ]);


      const totalRevenue =
        revenueResult.length > 0
          ? revenueResult[0].totalRevenue
          : 0;


      res.status(200).json({

        totalProducts,

        totalOrders,

        totalRevenue,

      });


    } catch (error) {

      console.error(
        "Admin dashboard error:",
        error.message
      );


      res.status(500).json({
        message:
          "Failed to load admin dashboard",
      });

    }

  }
);


// ========================================
// ADMIN - VIEW ALL ORDERS
// ========================================

router.get(
  "/orders",
  protect,
  admin,
  async (req, res) => {

    try {

      const orders =
        await Order.find()

          .populate(
            "user",
            "name email"
          )

          .sort({
            createdAt: -1,
          });


      res.status(200).json({
        orders,
      });


    } catch (error) {

      console.error(
        "Admin orders error:",
        error.message
      );


      res.status(500).json({
        message:
          "Failed to fetch orders",
      });

    }

  }
);


// ========================================
// ADMIN - UPDATE ORDER STATUS
// ========================================

router.put(
  "/orders/:id/status",
  protect,
  admin,
  async (req, res) => {

    try {

      const {
        status,
      } = req.body;


      // Allowed statuses must match Order model
      const allowedStatuses = [

        "Placed",

        "Processing",

        "Shipped",

        "Delivered",

        "Cancelled",

      ];


      // Validate status
      if (
        !status ||
        !allowedStatuses.includes(status)
      ) {

        return res.status(400).json({
          message:
            "Invalid order status",
        });

      }


      // Find order
      const order =
        await Order.findById(
          req.params.id
        );


      if (!order) {

        return res.status(404).json({
          message:
            "Order not found",
        });

      }


      // Update status
      order.status =
        status;


      await order.save();


      // Return updated order
      const updatedOrder =
        await Order.findById(
          order._id
        ).populate(
          "user",
          "name email"
        );


      res.status(200).json({

        message:
          "Order status updated successfully",

        order:
          updatedOrder,

      });


    } catch (error) {

      console.error(
        "Update order status error:",
        error.message
      );


      // Invalid MongoDB ObjectId
      if (
        error.name === "CastError"
      ) {

        return res.status(400).json({
          message:
            "Invalid order ID",
        });

      }


      res.status(500).json({
        message:
          "Failed to update order status",
      });

    }

  }
);


module.exports = router;