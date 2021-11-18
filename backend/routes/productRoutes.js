const express = require("express");
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getTopProducts, createProductReview, deleteProductReview } = require("../controllers/productController");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

router.route("/").get(getProducts).post(isAuth, isAdmin, createProduct);
router.route("/top").get(getTopProducts);
router.route("/:id").get(getProductById).put(isAuth, isAdmin, updateProduct).delete(isAuth, isAdmin, deleteProduct);
router.route("/:id/reviews").post(isAuth, createProductReview);
router.route("/:id/reviews/:reviewId").delete(isAuth, deleteProductReview);

module.exports = router;
