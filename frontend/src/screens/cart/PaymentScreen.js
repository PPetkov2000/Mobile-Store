import React, { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../actions/cartActions'
import CheckoutSteps from '../../components/CheckoutSteps'

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { shippingAddress } = useSelector((state) => state.cart)
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <div className="payment-method__container">
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col xs={12} md={8} className="mx-auto">
          <h2>Payment Method</h2>
          <Form onSubmit={submitHandler} className="payment-method__form text-center">
            <Form.Group>
              <Form.Label as="legend" className="payment-method__label">
                Select Method
              </Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  label="PayPal or Credit Card"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>
            <button type="submit" className="btn btn-main">
              Continue
            </button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default PaymentScreen
