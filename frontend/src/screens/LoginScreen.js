import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { login } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormInput from "../components/FormInput";

function LoginScreen({ history, location }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    dispatch(login(email, password));
  };

  return (
    <div className="auth__container">
      <h2 className="text-center">Login</h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className="auth-form">
        <FormInput type="email" name="email" placeholder="Enter email" value={email} handleChange={(e) => setEmail(e.target.value)} />
        <FormInput type="password" name="password" placeholder="Enter password" value={password} handleChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn btn-main btn-full-width">Login</button>
        <Row className="py-3">
          <Col>New Customer? <Link to="/register">Register</Link></Col>
        </Row>
      </Form>
    </div>
  );
}

export default LoginScreen;

/* CLASS IMPLEMENTATION */
// import { connect } from "react-redux";

// class LoginScreen extends React.Component {
//   state = {
//     email: "",
//     password: "",
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
//     this.props.login(this.state.email, this.state.password);
//   };

//   render() {
//     return (
//       <div className="auth__container">
//         <h2 className="text-center">Sign Up</h2>
//         {this.props.error && (
//           <Message variant="danger">{this.props.error}</Message>
//         )}
//         {this.props.loading && <Loader />}
//         <Form onSubmit={this.submitHandler} className="auth-form">
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

//           <button type="submit" className="btn btn-main btn-full-width">
//             Login
//           </button>

//           <Row className="py-3">
//             <Col>
//               New Customer? <Link to="/register">Register</Link>
//             </Col>
//           </Row>
//         </Form>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => state.userLogin;
// const mapDispatchToProps = { login };
// export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
