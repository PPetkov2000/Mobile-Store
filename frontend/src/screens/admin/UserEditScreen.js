import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUser } from "../../actions/userActions";
import { USER_UPDATE_RESET } from "../../constants/userConstants";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormInput from "../../components/FormInput";

function UserEditScreen({ match, history }) {
  const userId = match.params.id;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.username || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setEmail(user.email);
        setUsername(user.username);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, email, username, isAdmin }));
  };

  return (
    <div className="user-edit-page-container">
      <h3 className="text-center">Edit User</h3>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <FormInput
            type="text"
            name="Username"
            placeholder="Enter username"
            value={username}
            handleChange={(e) => setUsername(e.target.value)}
          />
          <FormInput
            type="email"
            name="Email Address"
            placeholder="Enter email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Form.Group controlId="isadmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <button type="submit" className="btn full-width user-edit-page-btn">
            Update
          </button>
        </Form>
      )}
    </div>
  );
}

export default UserEditScreen;
