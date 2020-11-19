import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="checkout-steps">
      <Nav.Item className="nav-item">
        {step1 ? (
          <Link to="/login" className="nav-item-link">
            <i className="fa fa-check-square" aria-hidden="true"></i> Sign In
          </Link>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="nav-item">
        {step2 ? (
          <Link to="/shipping" className="nav-item-link">
            <i className="fa fa-check-square" aria-hidden="true"></i> Shipping
          </Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="nav-item">
        {step3 ? (
          <Link to="/payment" className="nav-item-link">
            <i className="fa fa-check-square" aria-hidden="true"></i> Payment
          </Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="nav-item">
        {step4 ? (
          <Link to="/placeorder" className="nav-item-link">
            <i className="fa fa-check-square" aria-hidden="true"></i> Place
            Order
          </Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
