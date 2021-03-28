import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { register } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormInput from "../components/FormInput";

function RegisterScreen({ history, location }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      dispatch(register(username, email, password, confirmPassword));
    }
  };

  return (
    <div className="auth__container">
      <h2 className="text-center">Sign Up</h2>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className="auth-form">
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
          Register
        </button>

        <Row className="py-3">
          <Col>
            Have an Account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default RegisterScreen;
