import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Table } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Paginate from "../components/Paginate";

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
    <>
      <Row>
        <Col md={4} className="mb-5">
          <h3 className="profile-title-color">User Profile</h3>
          {message && <Message variant="danger">{message}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler} className="update-profile-form">
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <button
                type="submit"
                className="btn full-width update-profile-btn"
              >
                Update
              </button>
            </Form>
          )}
        </Col>
        <Col md={8}>
          <h3 className="profile-title-color mb-3">My Orders</h3>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive size="sm">
              <thead style={{ backgroundColor: "#f3be2d" }}>
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
                        <i className="fa fa-times profile-title-color"></i>
                      )}
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/order/${order._id}`}
                        className="btn profile-order-details-btn"
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
      <div className="fav-products-container">
        <h3 className="fav-products-title">Favourites</h3>
        <div className="fav-product-div">
          {user.favouriteProducts && user.favouriteProducts.length === 0 ? (
            <Message>No favouirites</Message>
          ) : (
            <Row xs={2} sm={2} md={4} lg={4} xl={4}>
              {user.favouriteProducts &&
                user.favouriteProducts.map((product) => (
                  <Col key={product._id}>
                    <Product product={product} />
                  </Col>
                ))}
            </Row>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileScreen;
