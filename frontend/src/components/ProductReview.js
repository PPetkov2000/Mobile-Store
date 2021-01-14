import React from "react";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductReview } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import ProductReviewForm from "./ProductReviewForm";

function ProductReview({ productId, productReviews }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewDelete = useSelector((state) => state.productReviewDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productReviewDelete;

  const deleteReviewHandler = () => {
    if (productReviews) {
      const productReview = productReviews.find(
        (r) => r.creator === userInfo._id
      );
      dispatch(deleteProductReview(productId, productReview._id));
    }
  };

  return (
    <div className="product-review-container">
      <h3>Reviews</h3>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {successDelete && <Message variant="success">Review removed</Message>}
      {productReviews.length === 0 && <Message>No Reviews</Message>}
      {productReviews.map((review) => {
        return (
          <div key={review._id} style={{ borderBottom: "1px solid grey" }}>
            <div className="product-review-header">
              <strong className="px-2">{review.name}</strong>
              {review.creator === userInfo && userInfo._id && (
                <button
                  className="product-review-delete-btn"
                  onClick={deleteReviewHandler}
                >
                  <i className="fa fa-trash"></i>
                </button>
              )}
            </div>
            <div className="px-2">
              <Rating value={review.rating} />
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-1">{review.comment}</p>
                <Badge variant="dark" className="align-self-end mb-1">
                  {review.createdAt.substring(0, 10)}
                </Badge>
              </div>
            </div>
          </div>
        );
      })}
      {productReviews &&
        userInfo &&
        Boolean(
          !productReviews.find(
            (r) => r.creator.toString() === userInfo._id.toString()
          )
        ) && <ProductReviewForm productId={productId} />}
    </div>
  );
}

export default ProductReview;
