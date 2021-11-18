const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const asyncWrapper = require("../middleware/asyncWrapper");

const getProducts = asyncWrapper(async (req, res) => {
  const productsPerPage = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword }).limit(productsPerPage).skip(productsPerPage * (page - 1));
  // 8 * (1 - 1) = 0 skipped products on page 1 | 8 * (2 - 1) = 8 skipped products on page 2

  res.json({ products, page, pages: Math.ceil(count / productsPerPage), count: products.length });
});

const getProductById = asyncWrapper(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error(`Product with id: ${req.params.id} not found`);
  }
});

const createProduct = asyncWrapper(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    images: req.body.images,
    brand: req.body.brand,
    price: req.body.price,
    cpu: req.body.cpu,
    camera: req.body.camera,
    size: req.body.size,
    weight: req.body.weight,
    display: req.body.display,
    battery: req.body.battery,
    memory: req.body.memory,
    description: req.body.description,
    countInStock: req.body.countInStock,
    quantity: req.body.quantity,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncWrapper(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.images = req.body.images ? req.body.images.toString().split(/,\s|,/g) : product.images;
    product.brand = req.body.brand || product.brand;
    product.price = req.body.price || product.price;
    product.cpu = req.body.cpu || product.cpu;
    product.camera = req.body.camera || product.camera;
    product.size = req.body.size || product.size;
    product.weight = req.body.weight || product.weight;
    product.display = req.body.display || product.display;
    product.battery = req.body.battery || product.battery;
    product.memory = req.body.memory || product.memory;
    product.description = req.body.description || product.description;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.quantity = req.body.quantity || product.quantity;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error(`Product with id: ${req.params.id} not found`);
  }
});

const deleteProduct = asyncWrapper(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error(`Product with id: ${req.params.id} not found`);
  }
});

const getTopProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find().sort({ rating: "desc" }).limit(3);
  res.json(products);
});

const createProductReview = asyncWrapper(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find((r) => r.creator.toString() === req.user._id.toString());

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.username,
      rating: Number(req.body.rating),
      comment: req.body.comment,
      creator: req.user._id,
    };

    product.reviews.push(review);
    product.rating = product.reviews.reduce((acc, curr) => acc + curr.rating, 0) / product.reviews.length;

    const updatedProduct = await product.save();
    res.status(201).json({ product: updatedProduct });
  } else {
    res.status(404);
    throw new Error(`Product with id: ${req.params.id} not found`);
  }
});

const deleteProductReview = asyncWrapper(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const deleteReview = await product.reviews.id(req.params.reviewId).remove();
    product.rating -= deleteReview.rating;
    const updatedProduct = await product.save();
    res.json({ product: updatedProduct });
  } else {
    res.status(404);
    throw new Error(`Product with id: ${req.params.id} not found`);
  }
});

const addToFavourites = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (user.favouriteProducts.includes(req.params.id)) {
      res.status(400);
      throw new Error("Product is already in favourites");
    }

    user.favouriteProducts.push(req.params.id);
    await user.save();
    res.json({ message: `Product with id: ${req.params.id} added to favourites` });
  } else {
    res.status(404);
    throw new Error(`User with id: ${req.params.id} not found`);
  }
});

const removeFromFavourites = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (!user.favouriteProducts.includes(req.params.id)) {
      res.status(400);
      throw new Error("Product is already removed from favourites");
    }
    user.favouriteProducts = user.favouriteProducts.filter((x) => x._id.toString() !== req.params.id);
    await user.save();
    res.json({ message: `Product with id: ${req.params.id} removed from favourites` });
  } else {
    res.status(404);
    throw new Error(`User with id: ${req.params.id} not found`);
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  createProductReview,
  deleteProductReview,
  addToFavourites,
  removeFromFavourites
};
