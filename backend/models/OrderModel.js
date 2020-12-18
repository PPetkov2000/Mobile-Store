const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    creator: { type: "ObjectId", ref: "User", required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        imageUrl: { type: String, required: true },
        price: { type: Number, required: true, default: 0 },
        quantity: { type: Number, required: true, default: 0 },
        product: { type: "ObjectId", ref: "Product", required: true },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
