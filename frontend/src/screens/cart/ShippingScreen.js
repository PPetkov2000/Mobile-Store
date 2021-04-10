import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import { saveShippingAddress } from "../../actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps";
import FormInput from "../../components/FormInput";

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

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
          <h2>Shipping</h2>
          <Form onSubmit={submitHandler} className="shipping-address__form">
            <FormInput
              type="text"
              name="address"
              placeholder="Enter address"
              value={address}
              handleChange={(e) => setAddress(e.target.value)}
              icon={
                <i
                  key={address}
                  className="fa fa-address-book"
                  aria-hidden="true"
                ></i>
              }
            />
            <FormInput
              type="text"
              name="city"
              placeholder="Enter city"
              value={city}
              handleChange={(e) => setCity(e.target.value)}
              icon={
                <i key={city} className="fa fa-home" aria-hidden="true"></i>
              }
            />
            <FormInput
              type="text"
              name="postal code"
              placeholder="Enter postal code"
              value={postalCode}
              handleChange={(e) => setPostalCode(e.target.value)}
              icon={
                <i
                  key={postalCode}
                  className="fa fa-envelope-open"
                  aria-hidden="true"
                ></i>
              }
            />
            <FormInput
              type="text"
              name="country"
              placeholder="Enter country"
              value={country}
              handleChange={(e) => setCountry(e.target.value)}
              icon={
                <i key={country} className="fa fa-globe" aria-hidden="true"></i>
              }
            />
            <button type="submit" className="btn btn-main btn-full-width">
              Continue
            </button>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default ShippingScreen;
