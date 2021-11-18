import React from "react";

const Rating = ({ value, text }) => {
  return (
    <div className="product-rating">
      {text && <p className="product-rating__text">{text}</p>}
      <span>
        <i className={value >= 1 ? "fa fa-star" : value >= 0.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
      </span>
      <span>
        <i className={value >= 2 ? "fa fa-star" : value >= 1.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
      </span>
      <span>
        <i className={value >= 3 ? "fa fa-star" : value >= 2.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
      </span>
      <span>
        <i className={value >= 4 ? "fa fa-star" : value >= 3.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
      </span>
      <span>
        <i className={value >= 5 ? "fa fa-star" : value >= 4.5 ? "fa fa-star-half-o" : "fa fa-star-o"}></i>
      </span>
    </div>
  );
}

export default Rating;
