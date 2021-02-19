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
    <div className="product-review">
      <h2 className="product-review__title">Reviews</h2>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {successDelete && <Message variant="success">Review removed</Message>}
      {productReviews.length === 0 && <Message>No Reviews</Message>}
      {productReviews.map((review) => {
        return (
          <div key={review._id}>
            <div className="product-review__header">
              <div className="d-flex">
                <p className="mb-0 mr-4">{review.name}</p>
                <Rating value={review.rating} />
              </div>
              {userInfo &&
                (review.creator === userInfo._id || userInfo.isAdmin) && (
                  <button
                    className="btn-red--icon"
                    onClick={deleteReviewHandler}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                )}
            </div>
            <div className="product-review__content">
              <p>
                {review.comment}
                <Badge variant="dark">
                  {review.createdAt.substring(0, 10)}
                </Badge>
              </p>
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
        ) && (
          <>
            <hr className="bg-secondary" />
            <ProductReviewForm productId={productId} />
          </>
        )}
    </div>
  );
}

export default ProductReview;
