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
      <h2 className="mb-3 order-title">
        <i className="fa fa-id-badge" aria-hidden="true"></i> Order: {order._id}
      </h2>
      <Row xs={1} sm={1} md={1} lg={2} xl={2}>
        <Col lg={8} xl={8}>
          <div className="order-item-div mb-3">
            <h3 className="title-color">Shipping</h3>
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
            <h3 className="title-color">Payment Method</h3>
            <p>
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
            <h3 className="mb-3 title-color">Order Items</h3>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              order.orderItems.map((item, index) => (
                <Row key={index} className="order-item">
                  <Col xs={2} sm={2} md={2}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="item-img"
                    />
                  </Col>
                  <Col>
                    <Link
                      to={`/products/${item.product}`}
                      className="item-name"
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col xs={5} sm={5} md={5}>
                    {item.quantity} * {item.price} = $
                    {item.quantity * item.price}
                  </Col>
                </Row>
              ))
            )}
          </div>
        </Col>
        <Col lg={4} xl={4}>
          <div className="order-summary-div">
            <h3 className="text-center mb-3">Order Summary</h3>
            <Row>
              <Col>Items</Col>
              <Col className="text-right">${order.itemsPrice}</Col>
            </Row>
            <Row>
              <Col>Shipping</Col>
              <Col className="text-right">${order.shippingPrice}</Col>
            </Row>
            <Row>
              <Col>Tax</Col>
              <Col className="text-right">${order.taxPrice}</Col>
            </Row>
            <Row className="total-price-row">
              <Col>
                <p>Total</p>
              </Col>
              <Col className="text-right">
                <p>${order.totalPrice}</p>
              </Col>
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
