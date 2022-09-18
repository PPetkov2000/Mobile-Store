import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Form } from 'react-bootstrap'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormInput from '../components/FormInput'
import Products from '../components/Products'
import UserOrders from '../components/UserOrders'
import useForm from '../customHooks/useForm'
import { PROFILE_FIELDS } from '../configs/form-fields'

function ProfileScreen({ match }) {
  const dispatch = useDispatch()
  const { loading, error, user } = useSelector((state) => state.userDetails)
  const { success } = useSelector((state) => state.userUpdateProfile)
  const { formData, handleChange } = useForm({ username: user?.username || '', email: user?.email || '', password: '', confirmPassword: '' })
  const pageNumber = match.params.pageNumber || 1

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserProfile({ _id: user._id, ...formData }))
  }

  useEffect(() => {
    if (!user || !user.username || success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      dispatch(getUserDetails('profile'))
    }
  }, [dispatch, user, success])

  return (
    <section className="profile">
      <Row>
        <Col md={4} className="mb-5">
          <h2 className="profile__title">My Profile</h2>
          {success && <Message variant="success">Profile Updated</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler} className="profile__form">
              {PROFILE_FIELDS(formData).map((field) => (
                <FormInput key={field.id} {...field} value={formData[field.name]} handleChange={handleChange} />
              ))}
              <button type="submit" className="btn btn-main btn-full-width">
                Update
              </button>
            </Form>
          )}
        </Col>
        <Col md={8}>
          <UserOrders pageNumber={pageNumber} />
        </Col>
      </Row>
      {user.favouriteProducts && (
        <section className="products">
          <h2 className="products__title">
            <i className="fa fa-heart"></i> favorite products
          </h2>
          {user.favouriteProducts.length === 0 ? (
            <div className="products__empty">
              <h3 className="products__empty-text">You don't have favorite products yet.</h3>
            </div>
          ) : (
            <Products products={user.favouriteProducts} />
          )}
        </section>
      )}
    </section>
  )
}

export default ProfileScreen
