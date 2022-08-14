import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row, Card, FormControl } from 'react-bootstrap'
import Message from '../../components/Message'
import { addToCart, removeFromCart } from '../../actions/cartActions'

function CartScreen({ match, location, history }) {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const productId = match.params.id
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity))
    }
  }, [dispatch, productId, quantity])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <section className="cart__container">
      <Row>
        <Col md={8} className="cart__info">
          <h2 className="mb-3">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            cartItems.map((item) => {
              return (
                <Row key={item.product} className="cart__info-item">
                  <Col md={1} sm={1} xs={1}>
                    <img src={item.images && item.images[0]} alt={item.name} className="cart__info-image" />
                  </Col>
                  <Col md={5} sm={5} xs={5}>
                    <Link to={`/products/${item.product}`} className="cart__info-product-name">
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={3} sm={3} xs={3}>
                    ${item.price}
                  </Col>
                  <Col md={2} sm={2} xs={2}>
                    <FormControl as="select" value={item.quantity} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col md={1} sm={1} xs={1}>
                    <button type="button" className="btn btn-red--icon cart-remove-item-btn" onClick={() => removeFromCartHandler(item.product)}>
                      <i className="fa fa-trash"></i>
                    </button>
                  </Col>
                </Row>
              )
            })
          )}
        </Col>
        <Col md={4}>
          <Card className="cart__purchase-info">
            <h5 className="cart__purchase-info-title">
              Subtotal ({cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} {cartItems.length === 1 ? 'item' : 'items'}) : $
              {cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}
            </h5>
            <button className="btn btn-cart" onClick={checkoutHandler} disabled={cartItems.length === 0}>
              Proceed to Checkout
            </button>
          </Card>
        </Col>
      </Row>
    </section>
  )
}

export default CartScreen
