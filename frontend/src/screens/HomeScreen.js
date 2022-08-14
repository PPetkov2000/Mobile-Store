import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Products from '../components/Products'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'

function HomeScreen({ match }) {
  const dispatch = useDispatch()
  const { loading, error, products, page, pages } = useSelector((state) => state.productList)
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [keyword, pageNumber])

  return (
    <>
      {!keyword && <ProductCarousel />}
      <Container className="products">
        <h2 className="products__title">
          <i className="fa fa-shopping-bag" aria-hidden="true"></i> featured products
        </h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : products.length === 0 ? (
          <div className="products__empty">
            <h2 className="products__empty-text">Products not found</h2>
            <Link to="/" className="btn btn-light">
              Go Back
            </Link>
          </div>
        ) : (
          <Products products={products} page={page} pages={pages} keyword={keyword ? keyword : ''} />
        )}
      </Container>
    </>
  )
}

export default HomeScreen
