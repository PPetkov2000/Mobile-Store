import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails, updateUser } from '../../actions/userActions'
import { USER_UPDATE_RESET } from '../../constants/userConstants'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormInput from '../../components/FormInput'
import useForm from '../../customHooks/useForm'
import { USER_EDIT_FIELDS } from '../../configs/form-fields'

function UserEditScreen({ match, history }) {
  const dispatch = useDispatch()
  const { loading, error, user } = useSelector((state) => state.userDetails)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector((state) => state.userUpdate)
  const { formData, setFormData, handleChange } = useForm({ username: '', email: '', isAdmin: false })
  const userId = match.params.id

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, ...formData }))
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.username || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setFormData({ username: user.username, email: user.email, isAdmin: user.isAdmin })
      }
    }
  }, [successUpdate, user, userId])

  return (
    <div className="edit-page__container">
      <h2 className="text-center">Edit User</h2>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          {USER_EDIT_FIELDS(formData).map((field) => (
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

export default UserEditScreen
