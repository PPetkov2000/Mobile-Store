const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  payOrder,
} = require("../controllers/orderController");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

router.route("/").get(isAuth, isAdmin, getOrders);
router.route("/myorders").get(isAuth, getMyOrders);
router.route("/create").post(isAuth, createOrder);
router.route("/:id").get(isAuth, getOrderById);
router.route("/:id/pay").put(isAuth, payOrder);

module.exports = router;
