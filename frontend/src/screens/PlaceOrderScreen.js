import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstans";
import { USER_DETAILS_RESET } from "../constants/userConstants";

function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }

  const formatPrice = (price) => {
    return Math.round((price * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = formatPrice(
    cart.cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
  );
  cart.shippingPrice = formatPrice(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = formatPrice(Number((cart.itemsPrice * 0.15).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { error, success, order } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, history, success, order]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems.map((item) => {
          return {
            name: item.name,
            imageUrl: item.images[0],
            price: item.price,
            quantity: item.quantity,
            product: item.product,
          };
        }),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <div className="place-order-div mb-3">
            <h4 className="title-color">Shipping</h4>
            <p className="mb-0">
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>
          <div className="place-order-div mb-3">
            <h4 className="title-color">Payment Method</h4>
            <strong>Method: </strong>
            {cart.paymentMethod}
          </div>
          <div className="place-order-div">
            <h4 className="title-color mb-3">Order Items</h4>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              cart.cartItems.map((item, index) => (
                <Row key={index} className="place-order-item">
                  <Col md={2} xs={1} sm={1}>
                    <img
                      src={item.images && item.images[0]}
                      alt={item.name}
                      className="place-order-img"
                    />
                  </Col>
                  <Col>
                    <Link
                      to={`/products/${item.product}`}
                      className="product-name"
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={5} xs={5} sm={5}>
                    {item.quantity} * {item.price} = $
                    {item.quantity * item.price}
                  </Col>
                </Row>
              ))
            )}
          </div>
        </Col>
        <Col md={4}>
          <div className="place-order-summary-div">
            <h4 className="text-center mb-3">Order Summary</h4>
            <Row>
              <Col>
                <strong>Items</strong>
              </Col>
              <Col className="text-right">${cart.itemsPrice}</Col>
            </Row>
            <Row>
              <Col>
                <strong>Shipping</strong>
              </Col>
              <Col className="text-right">${cart.shippingPrice}</Col>
            </Row>
            <Row>
              <Col>
                <strong>Tax</strong>
              </Col>
              <Col className="text-right">${cart.taxPrice}</Col>
            </Row>
            <Row className="total-price-row">
              <Col md={4} sm={6} xs={6}>
                <strong>Total</strong>
              </Col>
              <Col md={8} sm={6} xs={6} className="text-right">
                ${cart.totalPrice}
              </Col>
            </Row>
            <div>{error && <Message variant="danger">{error}</Message>}</div>
            <button
              type="button"
              className="btn full-width place-order-button"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderScreen;
