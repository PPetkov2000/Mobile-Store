import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, FormControl } from "react-bootstrap";
import { listProducts } from "../actions/productActions";

function ProductSearchForm() {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(keyword));
    setKeyword("");
  };

  return (
    <Form inline className="search-form mx-auto" onSubmit={searchHandler}>
      <FormControl
        type="text"
        placeholder="Search..."
        className="mr-sm-2 searchInput"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="btn btn-green--hidden-below-1000">
        Search
      </button>
    </Form>
  );
}

export default ProductSearchForm;
