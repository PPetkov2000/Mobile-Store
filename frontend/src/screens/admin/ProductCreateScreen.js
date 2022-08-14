import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'
import FormInput from '../../components/FormInput'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import useForm from '../../customHooks/useForm'

const initialFormData = {
  name: '',
  images: '',
  brand: '',
  price: '',
  cpu: '',
  camera: '',
  size: '',
  weight: '',
  display: '',
  battery: '',
  memory: '',
  countInStock: '',
  description: '',
}

const ProductCreateScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { loading, error, success, product } = useSelector((state) => state.productCreate)
  const { formData, handleChange } = useForm(initialFormData)

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      history.push('/admin/productlist')
    }
  }, [success, product])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProduct(formData))
  }

  return (
    <div className="product-create__container">
      <h2 className="text-center">Create Product</h2>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        {Object.keys(initialFormData).map((key) => (
          <FormInput
            key={key}
            type={typeof formData[key] === 'number' ? 'number' : 'text'}
            name={key}
            placeholder={`Enter ${key}`}
            value={formData[key]}
            handleChange={handleChange}
          />
        ))}
        <button type="submit" className="btn btn-main btn-full-width">
          Create
        </button>
      </Form>
    </div>
  )
}

export default ProductCreateScreen
