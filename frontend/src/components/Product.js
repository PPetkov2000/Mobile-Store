import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-card__image-wrapper">
        <img src={product.images[0]} className="product-card__image" alt={product.name} />
        <img src={product.images[1]} className="product-card__image" alt={product.name} />
      </Link>
      <h5 className="product-card__title">{product.name}</h5>
      <h6 className="product-card__subtitle">{product.memory}, {product.battery}</h6>
      <Rating value={product.rating} />
      <h5 className="product-card__text">${product.price}</h5>
    </div>
  );
}

export default Product;
