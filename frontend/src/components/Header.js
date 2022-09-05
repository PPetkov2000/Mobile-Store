import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { Navbar, Nav, Badge, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import ProductSearchForm from './ProductSearchForm'

function Header() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.userLogin)
  const [show, setShow] = useState(false)

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar collapseOnSelect expand="md" bg="light" variant="light" fixed="top">
        <Navbar.Brand>
          <img src="./images/logo.jpg" alt="logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <ProductSearchForm />
          <Nav className="ml-auto">
            <NavLink to="/" exact className="nav-link">
              Home
            </NavLink>
            {userInfo ? (
              <>
                <NavLink to="/profile" className="nav-link">
                  {userInfo.username}
                </NavLink>
                <Nav.Link className="nav-link" onClick={logoutHandler}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </>
            )}
          </Nav>
          {userInfo && userInfo.isAdmin && (
            <>
              <NavDropdown title="Admin" id="admin-menu" show={show} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                <NavDropdown.Item onClick={() => history.push('/admin/userlist')}>Users</NavDropdown.Item>
                <NavDropdown.Item onClick={() => history.push('/admin/productlist')}>Products</NavDropdown.Item>
                <NavDropdown.Item onClick={() => history.push('/admin/orderlist')}>Orders</NavDropdown.Item>
              </NavDropdown>
              {/* Mobile view */}
              <NavLink to="/admin/userlist" className="nav-link mobile-view">
                Users
              </NavLink>
              <NavLink to="/admin/productlist" className="nav-link mobile-view">
                Products
              </NavLink>
              <NavLink to="/admin/orderlist" className="nav-link mobile-view">
                Orders
              </NavLink>
            </>
          )}
          {userInfo && (
            <Link to="/cart">
              <i className="navbar__icon fa fa-shopping-cart" aria-hidden="true">
                {cartItems.length > 0 && (
                  <Badge variant="danger" className="cart-badge">
                    {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                  </Badge>
                )}
              </i>
            </Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header
