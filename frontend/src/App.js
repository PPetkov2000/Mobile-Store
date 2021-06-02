import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import CartScreen from "./screens/cart/CartScreen";
import ShippingScreen from "./screens/cart/ShippingScreen";
import PaymentScreen from "./screens/cart/PaymentScreen";
import PlaceOrderScreen from "./screens/cart/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";
import ProductCreateScreen from "./screens/admin/ProductCreateScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-5">
        <ErrorBoundary>
          <Switch>
            <Route
              path={[
                "/",
                "/search/:keyword",
                "/page/:pageNumber",
                "/search/:keyword/page/:pageNumber",
              ]}
              exact
              component={HomeScreen}
            />
            <Container>
              <Route path="/products/:id" component={ProductScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/order/:id" component={OrderScreen} />
              <Route path="/shipping" component={ShippingScreen} />
              <Route path="/payment" component={PaymentScreen} />
              <Route path="/placeorder" component={PlaceOrderScreen} />
              <Route path="/profile" exact component={ProfileScreen} />
              <Route
                path="/profile/page/:pageNumber"
                exact
                component={ProfileScreen}
              />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/admin/userlist" exact component={UserListScreen} />
              <Route
                path="/admin/userlist/:pageNumber"
                exact
                component={UserListScreen}
              />
              <Route path="/admin/user/:id/edit" component={UserEditScreen} />
              <Route
                path="/admin/productlist"
                exact
                component={ProductListScreen}
              />
              <Route
                path="/admin/productlist/:pageNumber"
                exact
                component={ProductListScreen}
              />
              <Route
                path="/admin/product/:id/edit"
                component={ProductEditScreen}
              />
              <Route
                path="/admin/product/create"
                exact
                component={ProductCreateScreen}
              />
              <Route
                path="/admin/orderlist"
                exact
                component={OrderListScreen}
              />
              <Route
                path="/admin/orderlist/:pageNumber"
                exact
                component={OrderListScreen}
              />
            </Container>
            <Route path="*" component={PageNotFound} />
          </Switch>
        </ErrorBoundary>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
