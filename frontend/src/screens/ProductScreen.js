import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from "../actions/productActions";
import Rating from "../components/Rating";
import { USER_ADD_FAVOURITES_RESET } from "../constants/userConstants";
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
    if (!product || product._id !== productId || successFavourites) {
      dispatch(listProductDetails(productId));
      dispatch({ type: USER_ADD_FAVOURITES_RESET });
      dispatch(getUserDetails("profile"));
    }

    if (successRemoveFavourites) {
      dispatch(getUserDetails("profile"));
    }
  }, [
    productId,
    dispatch,
    product,
    successFavourites,
    successRemoveFavourites,
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
      <Row xs={1} sm={1} md={3}>
        <Col>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-details-img"
          />
        </Col>
        <Col>
          <h3 className="product-details-title">{product.name}</h3>
          <Rating
            value={product.rating}
            text={`Clients reviewed: ${
              product.reviews && product.reviews.length
            }`}
          />
          <div className="product-features">
            <p>
              <strong>OS:</strong> {product.OS}
            </p>
            <p>
              <strong>Memory:</strong> {product.memory}GB, {product.RAM}RAM
            </p>
            <p>
              <strong>SIM:</strong> {product.SIM}
            </p>
            <p>
              <strong>Network:</strong> {product.network}
            </p>
            <p>
              <strong>Size:</strong> {product.size} inches
            </p>
            <p>
              <strong>Weight:</strong> {product.weight} g
            </p>
            <p>
              <strong>Color:</strong> {product.color}
            </p>
            <p>
              <strong>Release date:</strong> {product.releaseDate}
            </p>
          </div>
        </Col>
        <Col>
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
            {user &&
            user.favouriteProducts &&
            Boolean(
              !user.favouriteProducts.find(
                (x) => x._id.toString() === productId
              )
            ) ? (
              <button
                className="btn full-width add-to-favourites"
                onClick={addToFavouritesHandler}
              >
                <i className="fa fa-heart" aria-hidden="true"></i> add to
                favourites
              </button>
            ) : (
              <button
                className="btn full-width remove-from-favourites"
                onClick={removeFromFavouritesHandler}
              >
                <i className="fa fa-heart" aria-hidden="true"></i> remove from
                favourites
              </button>
            )}
            {loadingRemoveFavourites && <Loader />}
            {errorRemoveFavourites && (
              <p className="mb-0 text-danger">{errorRemoveFavourites}</p>
            )}
            {loadingFavourites && <Loader />}
            {errorFavourites && (
              <p className="mb-0 text-danger">{errorFavourites}</p>
            )}
          </div>
        </Col>
      </Row>
      <ProductReview productId={productId} />
    </section>
  );
}

export default ProductScreen;
