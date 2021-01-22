import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormInput from "../components/FormInput";

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
            <FormInput
              type="text"
              name={[
                <i
                  key="address"
                  className="fa fa-address-book"
                  aria-hidden="true"
                ></i>,
                " Address",
              ]}
              placeholder="Enter address"
              value={address}
              handleChange={(e) => setAddress(e.target.value)}
            />
            <FormInput
              type="text"
              name={[
                <i key="city" className="fa fa-home" aria-hidden="true"></i>,
                " City",
              ]}
              placeholder="Enter city"
              value={city}
              handleChange={(e) => setCity(e.target.value)}
            />
            <FormInput
              type="text"
              name={[
                <i
                  key="postalCode"
                  className="fa fa-envelope-open"
                  aria-hidden="true"
                ></i>,
                " Postal Code",
              ]}
              placeholder="Enter postal code"
              value={postalCode}
              handleChange={(e) => setPostalCode(e.target.value)}
            />
            <FormInput
              type="text"
              name={[
                <i key="county" className="fa fa-globe" aria-hidden="true"></i>,
                " Country",
              ]}
              placeholder="Enter country"
              value={country}
              handleChange={(e) => setCountry(e.target.value)}
            />

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
