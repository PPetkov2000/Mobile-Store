import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormInput from '../components/FormInput'
import useForm from '../customHooks/useForm'

function RegisterScreen({ history, location }) {
  const dispatch = useDispatch()
  const { loading, error, userInfo } = useSelector((state) => state.userLogin)
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const { formData, handleChange } = useForm({ username: '', email: '', password: '', confirmPassword: '' })

  const inputs = [
    {
      id: 1,
      type: 'text',
      name: 'username',
      label: 'Username',
      placeholder: 'Enter Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      errorMessage: 'Username should be 3-16 characters long and should not include any special characters!',
      required: true,
    },
    {
      id: 2,
      type: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
      errorMessage: 'Please enter a valid email address!',
      required: true,
    },
    {
      id: 3,
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Enter Password',
      pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$',
      errorMessage: 'Password should be 6-30 characters long and include at least 1 letter, 1 number, 1 special character!',
      required: true,
    },
    {
      id: 4,
      type: 'password',
      name: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'Enter Password again',
      pattern: formData.password,
      errorMessage: 'Passwords do not match!',
      required: true,
    },
  ]

  const submitHandler = (e) => {
    e.preventDefault()
    const emptyFields = Object.keys(formData)
      .map((key) => formData[key])
      .every(Boolean)
    if (emptyFields) return
    dispatch(register(...formData))
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
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value={formData[input.name]} handleChange={handleChange} />
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
