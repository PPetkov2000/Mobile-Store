import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Form } from 'react-bootstrap'
import { saveShippingAddress } from '../../actions/cartActions'
import CheckoutSteps from '../../components/CheckoutSteps'
import FormInput from '../../components/FormInput'
import useForm from '../../customHooks/useForm'

function ShippingScreen({ history }) {
  const dispatch = useDispatch()
  const { shippingAddress } = useSelector((state) => state.cart)
  const { formData, handleChange } = useForm({
    address: shippingAddress?.address || '',
    city: shippingAddress?.city || '',
    postalCode: shippingAddress?.postalCode || '',
    country: shippingAddress?.country || '',
  })

  const inputs = [
    {
      id: 1,
      type: 'text',
      name: 'address',
      label: 'Address',
      placeholder: 'Enter Address',
      icon: 'fa fa-address-book',
      required: true,
    },
    {
      id: 2,
      type: 'text',
      name: 'city',
      label: 'City',
      placeholder: 'Enter City',
      icon: 'fa fa-home',
      required: true,
    },
    {
      id: 3,
      type: 'text',
      name: 'postalCode',
      label: 'Postal Code',
      placeholder: 'Enter Postal Code',
      icon: 'fa fa-envelope-open',
      required: true,
    },
    {
      id: 4,
      type: 'text',
      name: 'country',
      label: 'Country',
      placeholder: 'Enter Country',
      icon: 'fa fa-globe',
      required: true,
    },
  ]

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
            {inputs.map((input) => (
              <FormInput key={input.id} {...input} value={formData[input.name]} handleChange={handleChange} />
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
