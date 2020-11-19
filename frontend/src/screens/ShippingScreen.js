import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <Row>
        <Col xs={12} md={8} className="mx-auto">
          <h3>Shipping</h3>
          <Form onSubmit={submitHandler} className="shipping-address-form">
            <Form.Group controlId="address">
              <Form.Label>
                <i className="fa fa-address-book" aria-hidden="true"></i>{" "}
                Address
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>
                <i className="fa fa-home" aria-hidden="true"></i> City
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode">
              <Form.Label>
                <i className="fa fa-envelope-open" aria-hidden="true"></i>{" "}
                Postal Code
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>
                <i className="fa fa-globe" aria-hidden="true"></i> Country
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <button type="submit" className="btn continue-btn">
              Continue
            </button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default ShippingScreen;
