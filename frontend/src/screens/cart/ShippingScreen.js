import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Form } from 'react-bootstrap'
import { saveShippingAddress } from '../../actions/cartActions'
import CheckoutSteps from '../../components/CheckoutSteps'
import FormInput from '../../components/FormInput'
import useForm from '../../customHooks/useForm'
import { SHIPPING_FIELDS } from '../../configs/form-fields'

function ShippingScreen({ history }) {
  const dispatch = useDispatch()
  const { shippingAddress } = useSelector((state) => state.cart)
  const { formData, handleChange } = useForm({
    address: shippingAddress?.address || '',
    city: shippingAddress?.city || '',
    postalCode: shippingAddress?.postalCode || '',
    country: shippingAddress?.country || '',
  })

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress(formData))
    history.push('/payment')
  }

  return (
    <>
      <CheckoutSteps step1 step2 />
      <Row>
        <Col xs={12} md={8} className="mx-auto">
          <h2>Shipping</h2>
          <Form onSubmit={submitHandler} className="shipping-address__form">
            {SHIPPING_FIELDS(formData).map((field) => (
              <FormInput key={field.id} {...field} value={formData[field.name]} handleChange={handleChange} />
            ))}
            <button type="submit" className="btn btn-main btn-full-width">
              Continue
            </button>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default ShippingScreen
