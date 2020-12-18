const Product = require("../models/ProductModel");

const getProducts = async (req, res, next) => {
  const productsPerPage = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  try {
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(productsPerPage)
      .skip(productsPerPage * (page - 1)); // 8 * (1 - 1) = 0 skipped products on page 1 | 8 * (2 - 1) = 8 skipped products on page 2

    res.json({ products, page, pages: Math.ceil(count / productsPerPage) });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
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

  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name;
      product.images = req.body.images.toString().split(/,\s|,/g);
      product.brand = req.body.brand;
      product.price = req.body.price;
      product.cpu = req.body.cpu;
      product.camera = req.body.camera;
      product.size = req.body.size;
      product.weight = req.body.weight;
      product.display = req.body.display;
      product.battery = req.body.battery;
      product.memory = req.body.memory;
      product.description = req.body.description;
      product.countInStock = req.body.countInStock;
      product.quantity = req.body.quantity;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  } catch (error) {
    next(error);
  }
};

const getTopProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ rating: "desc" }).limit(3);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const createProductReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.creator.toString() === req.user._id.toString()
      );

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
      product.rating =
        product.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
        product.reviews.length;

      const updatedProduct = await product.save();
      res.status(201).json({ product: updatedProduct });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  } catch (error) {
    next(error);
  }
};

const deleteProductReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      const deleteReview = await product.reviews
        .id(req.params.reviewId)
        .remove();
      product.rating -= deleteReview.rating;
      const updatedProduct = await product.save();
      res.json({ product: updatedProduct });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  createProductReview,
  deleteProductReview,
};
