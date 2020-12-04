import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { getOrderDetails } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ORDER_PAY_RESET } from "../constants/orderConstans";
import axios from "axios";
import { payOrder } from "../actions/orderActions";

function OrderScreen({ match, history }) {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    const formatPrice = (price) => {
      return Math.round((price * 100) / 100).toFixed(2);
    };

    order.itemsPrice = formatPrice(
      order.orderItems.reduce(
        (acc, curr) => acc + curr.quantity * curr.price,
        0
      )
    );
    order.shippingPrice = formatPrice(order.shippingPrice);
    order.taxPrice = formatPrice(order.taxPrice);
    order.totalPrice = formatPrice(order.totalPrice);
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPaypalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, history, userInfo, order, orderId, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2 className="mb-3">
        <i className="fa fa-id-badge" aria-hidden="true"></i> Order: {order._id}
      </h2>
      <Row>
        <Col md={8}>
          <div className="order-item-div mb-3">
            <h4 className="order-title-color">Shipping</h4>
            <p className="mb-0">
              <strong>Username: </strong>
              {order.creator.username}
            </p>
            <p className="mb-0">
              <strong>Email: </strong>
              {order.creator.email}
            </p>
            <p className="mb-0">
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
          </div>
          <div className="order-item-div mb-3">
            <h4 className="order-title-color">Payment Method</h4>
            <p className="mb-0">
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">
                <i className="fa fa-check" aria-hidden="true"></i> Paid on{" "}
                {new Date(Number(order.paidAt)).toLocaleDateString()}
              </Message>
            ) : (
              <Message variant="danger">
                <i className="fa fa-close" aria-hidden="true"></i> Not Paid
              </Message>
            )}
          </div>
          <div className="order-item-div mb-3">
            <h4 className="mb-3 order-title-color">Order Items</h4>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              order.orderItems.map((item, index) => (
                <Row key={index} className="order-item">
                  <Col md={2} xs={2} sm={2}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="order-item-img"
                    />
                  </Col>
                  <Col>
                    <Link
                      to={`/product/${order.product}`}
                      className="order-item-name"
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={4} xs={4} sm={4}>
                    {item.quantity} * {item.price} = $
                    {item.quantity * item.price}
                  </Col>
                </Row>
              ))
            )}
          </div>
        </Col>
        <Col md={4}>
          <div className="order-summary-div">
            <h4 className="text-center mb-3">Order Summary</h4>
            <Row>
              <Col>
                <strong>Items</strong>
              </Col>
              <Col className="text-right">${order.itemsPrice}</Col>
            </Row>
            <Row>
              <Col>
                <strong>Shipping</strong>
              </Col>
              <Col className="text-right">${order.shippingPrice}</Col>
            </Row>
            <Row>
              <Col>
                <strong>Tax</strong>
              </Col>
              <Col className="text-right">${order.taxPrice}</Col>
            </Row>
            <Row className="total-price-row">
              <Col>
                <strong>Total</strong>
              </Col>
              <Col className="text-right">${order.totalPrice}</Col>
            </Row>
            {!order.isPaid && (
              <Row className="paypal-button-row">
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </Row>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default OrderScreen;
