import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Navbar,
  Nav,
  Badge,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { logout } from "../actions/userActions";
import { listProducts } from "../actions/productActions";

function Header() {
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(keyword));
    setKeyword("");
  };

  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        fixed="top"
      >
        <Navbar.Brand>
          <img src="./images/logo.jpg" alt="logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form inline className="mx-auto" onSubmit={searchHandler}>
            <FormControl
              type="text"
              placeholder="Search..."
              className="mr-sm-2"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="btn search-btn">
              Search
            </button>
          </Form>
          <Nav className="ml-auto">
            <Link to="/" className="nav-link active">
              Home
            </Link>
            {userInfo ? (
              <>
                <Link to="/profile" className="nav-link">
                  {userInfo.username}
                </Link>
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
          {userInfo && (
            <Link to="/cart">
              <i className="fa fa-shopping-cart" aria-hidden="true">
                {cartItems.length > 0 && (
                  <Badge variant="danger" className="cart-badge">
                    {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                  </Badge>
                )}
              </i>
            </Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown
              title="Admin"
              id="admin-menu"
              show={show}
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              <NavDropdown.Item onClick={() => history.push("/admin/userlist")}>
                Users
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => history.push("/admin/productlist")}
              >
                Products
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => history.push("/admin/orderlist")}
              >
                Orders
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Navbar>

      {/* <img src="./images/banner.jpg" alt="banner" className="banner" /> */}
    </header>
  );
}

export default Header;
