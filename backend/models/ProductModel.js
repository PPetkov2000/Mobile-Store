const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    creator: { type: "ObjectId", ref: "User", required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: { type: Array, required: true },
    brand: { type: String, required: true },
    price: { type: Number, default: 0 },
    cpu: { type: String, required: true },
    camera: { type: String, required: true },
    size: { type: String, required: true },
    weight: { type: String, required: true },
    display: { type: String, required: true },
    battery: { type: String, required: true },
    memory: { type: String, required: true },
    description: { type: String, required: true },
    countInStock: { type: Number, default: 1 },
    quantity: { type: Number, default: 1 },
    rating: { type: Number, default: 0 },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
