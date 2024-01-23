import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Container, Spinner } from 'react-bootstrap'
import './App.scss'
import PrivateRoute from './router/PrivateRoute'
import AdminRoute from './router/AdminRoute'
import Header from './components/Header'
import Loader from './components/Loader'
import ErrorBoundary from './components/ErrorBoundary'

const HomeScreen = lazy(() => import('./screens/HomeScreen'))
const ProductScreen = lazy(() => import('./screens/ProductScreen'))
const RegisterScreen = lazy(() => import('./screens/RegisterScreen'))
const LoginScreen = lazy(() => import('./screens/LoginScreen'))
const CartScreen = lazy(() => import('./screens/cart/CartScreen'))
const ShippingScreen = lazy(() => import('./screens/cart/ShippingScreen'))
const PaymentScreen = lazy(() => import('./screens/cart/PaymentScreen'))
const PlaceOrderScreen = lazy(() => import('./screens/cart/PlaceOrderScreen'))
const OrderScreen = lazy(() => import('./screens/OrderScreen'))
const ProfileScreen = lazy(() => import('./screens/ProfileScreen'))
const UserListScreen = lazy(() => import('./screens/admin/UserListScreen'))
const UserEditScreen = lazy(() => import('./screens/admin/UserEditScreen'))
const ProductListScreen = lazy(() => import('./screens/admin/ProductListScreen'))
const ProductEditScreen = lazy(() => import('./screens/admin/ProductEditScreen'))
const OrderListScreen = lazy(() => import('./screens/admin/OrderListScreen'))
const ProductCreateScreen = lazy(() => import('./screens/admin/ProductCreateScreen'))
const Footer = lazy(() => import('./components/Footer'))
const Forbidden = lazy(() => import('./components/Forbidden'))
const PageNotFound = lazy(() => import('./components/PageNotFound'))

function App() {
  return (
    <Router>
      <Header />
      <main className="py-5">
        <ErrorBoundary>
          <Switch>
            <Suspense fallback={<Loader />}>
              <Route path={['/', '/search/:keyword', '/page/:pageNumber', '/search/:keyword/page/:pageNumber']} exact component={HomeScreen} />
              <Container>
                <Route path="/products/:id" component={ProductScreen} />
                <Route path="/cart/:id?" component={CartScreen} />
                <PrivateRoute path="/order/:id" component={OrderScreen} />
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <PrivateRoute path="/profile" exact component={ProfileScreen} />
                <PrivateRoute path="/profile/page/:pageNumber" exact component={ProfileScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/login" component={LoginScreen} />
                <AdminRoute path="/admin/userlist" exact component={UserListScreen} />
                <AdminRoute path="/admin/userlist/:pageNumber" exact component={UserListScreen} />
                <AdminRoute path="/admin/user/:id/edit" component={UserEditScreen} />
                <AdminRoute path="/admin/productlist" exact component={ProductListScreen} />
                <AdminRoute path="/admin/productlist/:pageNumber" exact component={ProductListScreen} />
                <AdminRoute path="/admin/product/:id/edit" component={ProductEditScreen} />
                <AdminRoute path="/admin/product/create" exact component={ProductCreateScreen} />
                <AdminRoute path="/admin/orderlist" exact component={OrderListScreen} />
                <AdminRoute path="/admin/orderlist/:pageNumber" exact component={OrderListScreen} />
                <Route path="/forbidden" component={Forbidden} />
                <Route path="/not-found" component={PageNotFound} />
              </Container>
              <Route path="*" component={() => <Redirect to="/not-found" />} />
            </Suspense>
          </Switch>
        </ErrorBoundary>
      </main>
      <Suspense fallback={<Spinner />}>
        <Footer />
      </Suspense>
    </Router>
  )
}

export default App
