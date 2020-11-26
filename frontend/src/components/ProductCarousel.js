import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listTopProducts } from "../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";

function ProductCarousel() {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="product-carousel bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link
            to={`/products/${product._id}`}
            className="product-carousel-img-link"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-carousel-img"
            />
            <Carousel.Caption>
              <h2
                style={{
                  backgroundColor: "black",
                  opacity: "0.7",
                  width: "60%",
                  margin: "auto",
                }}
              >
                {product.name} ${product.price}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
