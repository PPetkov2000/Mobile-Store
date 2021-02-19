import React from "react";
import { Row, Col } from "react-bootstrap";
import Paginate from "./Paginate";
import Product from "./Product";

function Products({ title, icon, products, page, pages, keyword }) {
  return (
    <section className="products__container">
      <h2 className="products__title">
        {icon} {title}
      </h2>
      <div className="products__content">
        <Row xs={1} sm={2} md={3} lg={4} xl={4}>
          {products.map((product) => {
            return (
              <Col key={product._id}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
        {page && <Paginate page={page} pages={pages} keyword={keyword} />}
      </div>
    </section>
  );
}

export default Products;
