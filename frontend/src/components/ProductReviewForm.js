import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_DELETE_REVIEW_RESET,
} from "../constants/productConstants";

function ProductReviewForm({ productId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { loading, error, success } = productReviewCreate;

  useEffect(() => {
    if (success) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      dispatch({ type: PRODUCT_DELETE_REVIEW_RESET });
      dispatch(listProductDetails(productId));
    }
  }, [dispatch, success, productId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(productId, { rating, comment }));
  };

  return (
    <>
      <div>
        <h2 className="product-review__form-title">Write a Customer Review</h2>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message variant="success">Review submitted successfully</Message>
        )}
      </div>
      {userInfo ? (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              row="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment"
            ></Form.Control>
          </Form.Group>
          <button
            disabled={loading}
            type="submit"
            className="btn btn-main btn-full-width"
          >
            Submit
          </button>
        </Form>
      ) : (
        <Message>
          Please <Link to="/login">sign in</Link> to write a review
        </Message>
      )}
    </>
  );
}

export default ProductReviewForm;
