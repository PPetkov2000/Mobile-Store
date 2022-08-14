import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import ProductReview from '../components/ProductReview'
import { listProductDetails, addToFavourites, removeFromFavourites } from '../actions/productActions'
import { getUserDetails } from '../actions/userActions'
import { PRODUCT_ADD_FAVOURITES_RESET, PRODUCT_REMOVE_FAVOURITES_RESET } from '../constants/productConstants'

function ProductScreen({ match, history }) {
  const dispatch = useDispatch()
  const { loading, error, product } = useSelector((state) => state.productDetails)
  const { user } = useSelector((state) => state.userDetails)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading: loadingFavorites, error: errorFavorites, success: successFavorites } = useSelector((state) => state.productAddFavourites)
  const {
    loading: loadingRemoveFavorites,
    error: errorRemoveFavorites,
    success: successRemoveFavorites,
  } = useSelector((state) => state.productRemoveFavourites)
  const productId = match.params.id

  useEffect(() => {
    if (!product || product._id !== productId) {
      dispatch(listProductDetails(productId))
      dispatch({ type: PRODUCT_ADD_FAVOURITES_RESET })
      if (userInfo) {
        dispatch(getUserDetails('profile'))
      }
    }

    if (successRemoveFavorites || successFavorites) {
      dispatch(getUserDetails('profile'))
      setTimeout(() => {
        dispatch({ type: PRODUCT_ADD_FAVOURITES_RESET })
        dispatch({ type: PRODUCT_REMOVE_FAVOURITES_RESET })
      }, 4000)
    }
  }, [productId, product, successFavorites, successRemoveFavorites, userInfo])

  const addToCartHandler = () => {
    history.push(`/cart/${productId}`)
  }

  const addToFavouritesHandler = () => {
    if (productId) {
      dispatch(addToFavourites(productId))
    }
  }

  const removeFromFavouritesHandler = () => {
    if (productId) {
      dispatch(removeFromFavourites(productId))
    }
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <section className="product-details">
      <Row xs={1} sm={2} md={2} lg={3} xl={3}>
        <Col>
          <img src={product.images && product.images[0]} alt={product.name} className="product-details__image" />
        </Col>
        <Col>
          <h3 className="product-details__name">{product.name}</h3>
          <Rating value={product.rating} text={`Clients reviewed: ${product.reviews && product.reviews.length}`} />
          <div className="product-details__features">
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
          <div className="product-details__order-container">
            <h3 className="product-details__order-price">Price: ${product.price}</h3>
            <i className="fa fa-truck btn-green--icon" aria-hidden="true"></i>
            <span className="free-delivery">free delivery</span>
            <button className="btn btn-full-width add-to-cart" onClick={addToCartHandler} title="Add to cart button">
              <i className="fa fa-cart-plus" aria-hidden="true"></i> add to cart
            </button>
            {Object.keys(user).length > 0 &&
              (user.favouriteProducts && Boolean(!user.favouriteProducts.find((x) => x._id.toString() === productId)) ? (
                <button className="btn btn-full-width add-to-favourites" onClick={addToFavouritesHandler} title="Add to favorites button">
                  <i className="fa fa-heart" aria-hidden="true"></i> add to favorites
                </button>
              ) : (
                <button
                  className="btn btn-full-width remove-from-favourites"
                  onClick={removeFromFavouritesHandler}
                  title="Remove from favorites button"
                >
                  <i className="fa fa-heart" aria-hidden="true"></i> remove from favorites
                </button>
              ))}
            {loadingRemoveFavorites && <Loader />}
            {errorRemoveFavorites && <Message variant="danger">{errorRemoveFavorites}</Message>}
            {successRemoveFavorites && (
              <div className="mt-3">
                <Message variant="success">Removed from favorites</Message>
              </div>
            )}
            {loadingFavorites && <Loader />}
            {errorFavorites && <Message variant="danger">{errorFavorites}</Message>}
            {successFavorites && (
              <div className="mt-3">
                <Message variant="success">Added to favorites</Message>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <ProductReview productId={productId} productReviews={product.reviews} />
    </section>
  )
}

export default ProductScreen
