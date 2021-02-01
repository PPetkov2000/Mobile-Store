import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";
import Products from "../components/Products";

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
          <Products
            title="featured products"
            icon={<i className="fa fa-shopping-bag" aria-hidden="true"></i>}
            products={products}
            page={page}
            pages={pages}
            keyword={keyword ? keyword : ""}
          />
        </Container>
      )}
    </>
  );
}

export default HomeScreen;
