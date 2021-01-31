import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";

function HomeScreen({ match }) {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <section className="featured-products">
            <h4 className="featured-products-title">
              <i className="fa fa-shopping-bag" aria-hidden="true"></i> featured
              products
            </h4>
            <div className="content">
              <Row xs={1} sm={1} md={3} lg={4} xl={4}>
                {products.map((product) => {
                  return (
                    <Col key={product._id}>
                      <Product product={product} />
                    </Col>
                  );
                })}
              </Row>
              <Paginate
                page={page}
                pages={pages}
                keyword={keyword ? keyword : ""}
              />
            </div>
          </section>
        </Container>
      )}
    </>
  );
}

export default HomeScreen;
