import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-card-img-a">
        <img
          src={product.imageUrl}
          className="product-card-img"
          alt={product.name}
        />
      </Link>
      <h5 className="product-card-title">{product.name}</h5>
      <h6 className="product-card-subtitle">
        {product.SIM}, {product.memory}GB, {product.network}, {product.color}
      </h6>
      <Rating value={product.rating} />
      <h5 className="product-card-text">${product.price}</h5>
    </div>
  );
}

export default Product;
