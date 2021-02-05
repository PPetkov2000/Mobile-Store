import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from "../actions/productActions";
import Rating from "../components/Rating";
import {
  USER_ADD_FAVOURITES_RESET,
  USER_REMOVE_FAVOURITES_RESET,
} from "../constants/userConstants";
import ProductReview from "../components/ProductReview";
import {
  addToFavourites,
  getUserDetails,
  removeFromFavourites,
} from "../actions/userActions";

function ProductScreen({ match, history }) {
  const productId = match.params.id;

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userAddFavourites = useSelector((state) => state.userAddFavourites);
  const {
    loading: loadingFavourites,
    error: errorFavourites,
    success: successFavourites,
  } = userAddFavourites;

  const userRemoveFavourites = useSelector(
    (state) => state.userRemoveFavourites
  );
  const {
    loading: loadingRemoveFavourites,
    error: errorRemoveFavourites,
    success: successRemoveFavourites,
  } = userRemoveFavourites;

  useEffect(() => {
    if (!product || product._id !== productId) {
      dispatch(listProductDetails(productId));
      dispatch({ type: USER_ADD_FAVOURITES_RESET });
      if (userInfo) {
        dispatch(getUserDetails("profile"));
      }
    }

    if (successRemoveFavourites || successFavourites) {
      dispatch(getUserDetails("profile"));
      setTimeout(() => {
        dispatch({ type: USER_ADD_FAVOURITES_RESET });
        dispatch({ type: USER_REMOVE_FAVOURITES_RESET });
      }, 4000);
    }
  }, [
    productId,
    dispatch,
    product,
    successFavourites,
    successRemoveFavourites,
    userInfo,
  ]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}`);
  };

  const addToFavouritesHandler = () => {
    if (productId) {
      dispatch(addToFavourites(productId));
    }
  };

  const removeFromFavouritesHandler = () => {
    if (productId) {
      dispatch(removeFromFavourites(productId));
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <section className="product-details">
      <Row xs={1} sm={2} md={2} lg={3} xl={3}>
        <Col>
          <img
            src={product.images && product.images[0]}
            alt={product.name}
            className="product-details-img"
          />
        </Col>
        <Col>
          <h3 className="product-name">{product.name}</h3>
          <Rating
            value={product.rating}
            text={`Clients reviewed: ${
              product.reviews && product.reviews.length
            }`}
          />
          <div className="product-features">
            <p>
              <strong>Memory:</strong> {product.memory}
            </p>
            <p>
              <strong>CPU:</strong> {product.cpu}
            </p>
            <p>
              <strong>Display:</strong> {product.display}
            </p>
            <p>
              <strong>Battery:</strong> {product.battery}
            </p>
            <p>
              <strong>Camera:</strong> {product.camera}
            </p>
            <p>
              <strong>Size:</strong> {product.size}
            </p>
            <p>
              <strong>Weight:</strong> {product.weight} g
            </p>
            <p>
              <strong>Description:</strong> {product.description} g
            </p>
          </div>
        </Col>
        <Col className="col-sm-12 col-md-12">
          <div className="product-order-container">
            <h3 className="product-price">Price: ${product.price}</h3>
            <i className="fa fa-truck" aria-hidden="true"></i>
            <span className="free-delivery">free delivery</span>
            <button
              className="btn full-width add-to-cart"
              onClick={addToCartHandler}
            >
              <i className="fa fa-cart-plus btn-icon" aria-hidden="true"></i>{" "}
              add to cart
            </button>
            {Object.keys(user).length > 0 &&
              (user.favouriteProducts &&
              Boolean(
                !user.favouriteProducts.find(
                  (x) => x._id.toString() === productId
                )
              ) ? (
                <button
                  className="btn full-width add-to-favourites"
                  onClick={addToFavouritesHandler}
                >
                  <i className="fa fa-heart btn-icon" aria-hidden="true"></i>{" "}
                  add to favourites
                </button>
              ) : (
                <button
                  className="btn full-width remove-from-favourites"
                  onClick={removeFromFavouritesHandler}
                >
                  <i className="fa fa-heart btn-icon" aria-hidden="true"></i>{" "}
                  remove from favourites
                </button>
              ))}
            {loadingRemoveFavourites && <Loader />}
            {errorRemoveFavourites && (
              <Message variant="danger">{errorRemoveFavourites}</Message>
            )}
            {successRemoveFavourites && (
              <div className="mt-3">
                <Message variant="success">Removed from favourites</Message>
              </div>
            )}
            {loadingFavourites && <Loader />}
            {errorFavourites && (
              <Message variant="danger">{errorFavourites}</Message>
            )}
            {successFavourites && (
              <div className="mt-3">
                <Message variant="success">Added to favourites</Message>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <ProductReview productId={productId} productReviews={product.reviews} />
    </section>
  );
}

export default ProductScreen;
