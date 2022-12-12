import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Paginate from './Paginate'
import Product from './Product'

function Products({ products = [], page, pages, keyword = '' }) {
  return (
    <>
      <Row xs={1} sm={2} md={3} lg={4} xl={4}>
        {products.map((product) => (
          <Col key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      {page && <Paginate page={page} pages={pages} keyword={keyword} />}
    </>
  )
}

export default Products
