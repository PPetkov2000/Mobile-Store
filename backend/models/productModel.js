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
    brand: { type: String, required: true },
    imageUrl: { type: String, required: true },
    OS: { type: String, required: true },
    memory: { type: Number, required: true, default: 0 },
    RAM: { type: Number, required: true, default: 0 },
    network: { type: String, required: true },
    SIM: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    size: { type: Number, required: true, default: 0 },
    weight: { type: Number, required: true, default: 0 },
    color: { type: String, required: true },
    releaseDate: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    creator: { type: "ObjectId", ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
