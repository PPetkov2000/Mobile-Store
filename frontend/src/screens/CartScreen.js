import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Card, FormControl } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen({ match, location, history }) {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div className="cart-container">
      <Row>
        <Col md={8} className="cart-info-column">
          <h2 className="mb-3">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            cartItems.map((item) => {
              return (
                <Row key={item.product} className="cart-info-item">
                  <Col md={1} sm={1} xs={1}>
                    <img
                      src={item.images && item.images[0]}
                      alt={item.name}
                      className="cart-image"
                    />
                  </Col>
                  <Col md={5} sm={5} xs={5}>
                    <Link
                      to={`/products/${item.product}`}
                      className="cart-product-name"
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={3} sm={3} xs={3}>
                    ${item.price}
                  </Col>
                  <Col md={2} sm={2} xs={2}>
                    <FormControl
                      as="select"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col md={1} sm={1} xs={1}>
                    <button
                      type="button"
                      className="cart-remove-item-btn"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </Col>
                </Row>
              );
            })
          )}
        </Col>
        <Col md={4}>
          <Card className="cart-card">
            <h5 className="cart-title">
              Subtotal (
              {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}{" "}
              {cartItems.length === 1 ? "item" : "items"}) : $
              {cartItems
                .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
                .toFixed(2)}
            </h5>
            <button
              className="btn full-width btn-cart"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
