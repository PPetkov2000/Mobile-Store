const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../middleware/authMiddleware");
const {
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
} = require("../controllers/productController");

router.route("/").get(getProducts).post(isAuth, isAdmin, createProduct);
router.route("/top").get(getTopProducts);
router.route("/:id").get(getProductById).put(isAuth, isAdmin, updateProduct).delete(isAuth, isAdmin, deleteProduct);
router.route("/:id/reviews").post(isAuth, createProductReview);
router.route("/:id/reviews/:reviewId").delete(isAuth, deleteProductReview);
router.route("/:id/like").put(isAuth, addToFavourites);
router.route("/:id/dislike").put(isAuth, removeFromFavourites);

module.exports = router;
