const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  createProductReview,
} = require("../controllers/productController");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

router.route("/").get(getProducts);
router.route("/top").get(getTopProducts);
router.route("/create").post(isAuth, isAdmin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(isAuth, isAdmin, updateProduct)
  .delete(isAuth, isAdmin, deleteProduct);
router.route("/:id/reviews").post(isAuth, createProductReview);

module.exports = router;
