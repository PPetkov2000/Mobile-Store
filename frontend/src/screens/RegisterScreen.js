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

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

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
          name="username"
          placeholder="Enter username"
          value={username}
          handleChange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          type="password"
          name="confirmPassword"
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

/* CLASS IMPLEMENTATION */
// import { connect } from "react-redux";

// class RegisterScreen extends React.Component {
//   state = {
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     message: "",
//   };

//   componentDidUpdate() {
//     const redirect = this.props.location.search
//       ? this.props.location.search.split("=")[1]
//       : "/";
//     if (this.props.userInfo) {
//       this.props.history.push(redirect);
//     }
//   }

//   submitHandler = (e) => {
//     e.preventDefault();
//     if (this.state.password !== this.state.confirmPassword) {
//       this.setState({ message: "Passwords do not match!" });
//     } else {
//       this.props.register(
//         this.state.username,
//         this.state.email,
//         this.state.password,
//         this.state.confirmPassword
//       );
//     }
//   };

//   render() {
//     return (
//       <div className="auth__container">
//         <h2 className="text-center">Sign Up</h2>
//         {this.state.message && (
//           <Message variant="danger">{this.state.message}</Message>
//         )}
//         {this.props.error && (
//           <Message variant="danger">{this.props.error}</Message>
//         )}
//         {this.props.loading && <Loader />}
//         <Form onSubmit={this.submitHandler} className="auth-form">
//           <FormInput
//             type="text"
//             name="Username"
//             placeholder="Enter username"
//             value={this.state.username}
//             handleChange={(e) => this.setState({ username: e.target.value })}
//           />
//           <FormInput
//             type="email"
//             name="Email"
//             placeholder="Enter email"
//             value={this.state.email}
//             handleChange={(e) => this.setState({ email: e.target.value })}
//           />
//           <FormInput
//             type="password"
//             name="Password"
//             placeholder="Enter password"
//             value={this.state.password}
//             handleChange={(e) => this.setState({ password: e.target.value })}
//           />
//           <FormInput
//             type="password"
//             name="Confirm Password"
//             placeholder="Confirm Password"
//             value={this.state.confirmPassword}
//             handleChange={(e) =>
//               this.setState({ confirmPassword: e.target.value })
//             }
//           />

//           <button type="submit" className="btn btn-main btn-full-width">
//             Register
//           </button>

//           <Row className="py-3">
//             <Col>
//               Have an Account? <Link to="/login">Login</Link>
//             </Col>
//           </Row>
//         </Form>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => state.userLogin;
// const mapDispatchToProps = { register };
// export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
