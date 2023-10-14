const Order = require("../models/OrderModel");
const asyncWrapper = require("../middleware/asyncWrapper");

const getOrders = asyncWrapper(async (req, res) => {
  const ordersPerPage = 8;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Order.countDocuments();
  const orders = await Order.find().populate("creator").sort({ updatedAt: "desc" }).limit(ordersPerPage).skip(ordersPerPage * (page - 1));
  // 8 * (1 - 1) = 0 skipped orders on page 1 | 8 * (2 - 1) = 8 skipped orders on page 2

  res.json({ orders, page, pages: Math.ceil(count / ordersPerPage), count: orders.length });
});

const getMyOrders = asyncWrapper(async (req, res) => {
  const ordersPerPage = 8;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Order.countDocuments({ creator: req.user._id });
  const orders = await Order.find({ creator: req.user._id }).populate("creator").sort({ createdAt: "desc" }).limit(ordersPerPage).skip(ordersPerPage * (page - 1));
  // 8 * (1 - 1) = 0 skipped orders on page 1 | 8 * (2 - 1) = 8 skipped orders on page 2

  res.json({ orders, page, pages: Math.ceil(count / ordersPerPage), count: orders.length });
});

const getOrderById = asyncWrapper(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("creator");
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error(`Order with id: ${req.params.id} not found`);
  }
});

const createOrder = asyncWrapper(async (req, res) => {
  if (req.body.orderItems && req.body.orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const order = new Order({
    orderItems: req.body.orderItems,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    creator: req.user._id,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

const payOrder = asyncWrapper(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error(`Order with id: ${req.params.id} not found`);
  }
});

module.exports = { getOrders, getMyOrders, getOrderById, createOrder, payOrder };
