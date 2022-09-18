import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormInput from '../../components/FormInput'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import useForm from '../../customHooks/useForm'
import { PRODUCT_FIELDS } from '../../configs/form-fields'

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

function ProductEditScreen({ match, history }) {
  const dispatch = useDispatch()
  const { loading, error, product } = useSelector((state) => state.productDetails)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector((state) => state.productUpdate)
  const { formData, setFormData, handleChange } = useForm(initialFormData)
  const productId = match.params.id

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        const productData = Object.keys(product)
          .filter((key) => initialFormData.hasOwnProperty(key))
          .reduce((acc, curr) => {
            acc[curr] = product[curr]
            return acc
          }, {})
        setFormData(productData)
      }
    }
  }, [productId, product, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({ _id: productId, ...formData }))
  }

  return (
    <div className="edit-page__container">
      <h2 className="text-center">Edit Product</h2>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          {PRODUCT_FIELDS(formData, true).map((field) => (
            <FormInput key={field.id} {...field} value={formData[field.name]} handleChange={handleChange} />
          ))}
          <button type="submit" className="btn btn-main btn-full-width">
            Update
          </button>
        </Form>
      )}
    </div>
  )
}

export default ProductEditScreen
