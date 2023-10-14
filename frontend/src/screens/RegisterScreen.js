import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormInput from '../components/FormInput'
import useForm from '../customHooks/useForm'
import { REGISTER_FIELDS } from '../configs/form-fields'

function RegisterScreen({ history, location }) {
  const dispatch = useDispatch()
  const { loading, error, userInfo } = useSelector((state) => state.userLogin)
  const { formData, handleChange } = useForm({ username: '', email: '', password: '', confirmPassword: '' })
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const submitHandler = (e) => {
    e.preventDefault()
    const emptyFields = Object.values(formData).filter(Boolean).length !== Object.values(formData).length
    if (emptyFields) return
    const { username, email, password, confirmPassword } = formData
    dispatch(register(username, email, password, confirmPassword))
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo])

  return (
    <div className="auth__container">
      <h2 className="text-center">Sign Up</h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className="auth-form">
        {REGISTER_FIELDS(formData).map((field) => (
          <FormInput key={field.id} {...field} value={formData[field.name]} handleChange={handleChange} />
        ))}
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
  )
}

export default RegisterScreen

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
