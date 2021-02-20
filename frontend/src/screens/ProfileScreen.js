import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Table } from "react-bootstrap";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import FormInput from "../components/FormInput";
import Products from "../components/Products";

function ProfileScreen({ history, match }) {
  const pageNumber = match.params.pageNumber || 1;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
    page,
    pages,
  } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.username || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setEmail(user.email);
        setUsername(user.username);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  useEffect(() => {
    dispatch(listMyOrders(pageNumber));
  }, [dispatch, pageNumber]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ _id: user._id, email, username, password }));
    }
  };

  return (
    <section className="profile">
      <Row>
        <Col md={4} className="mb-5">
          <h2 className="profile__title">User Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler} className="update-profile-form">
              <FormInput
                type="text"
                name="Username"
                placeholder="Enter username"
                value={username}
                handleChange={(e) => setUsername(e.target.value)}
              />
              <FormInput
                type="email"
                name="Email"
                placeholder="Enter email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                type="password"
                name="Password"
                placeholder="Enter password"
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
              />
              <FormInput
                type="password"
                name="Confirm Password"
                placeholder="Confirm Password"
                value={confirmPassword}
                handleChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-main btn-full-width">
                Update
              </button>
            </Form>
          )}
        </Col>
        <Col md={8}>
          <h2 className="profile__title">My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive
              size="sm"
              className="profile__table"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td className="text-center">
                      {order.isPaid ? (
                        new Date(Number(order.paidAt)).toLocaleDateString()
                      ) : (
                        <i className="fa fa-times btn-red--icon"></i>
                      )}
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/order/${order._id}`}
                        className="btn btn-full-width btn-blue--bordered p-0"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Paginate page={page} pages={pages} paginateStr="/profile" />
        </Col>
      </Row>
      {user.favouriteProducts && (
        <Products
          title="favourite products"
          icon={<i className="fa fa-heart"></i>}
          products={user.favouriteProducts}
        />
      )}
    </section>
  );
}

export default ProfileScreen;
