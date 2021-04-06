import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormInput from "../../components/FormInput";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";
import {
  listProductDetails,
  updateProduct,
} from "../../actions/productActions";

const initialFormData = {
  name: "",
  images: "",
  brand: "",
  price: "",
  cpu: "",
  camera: "",
  size: "",
  weight: "",
  display: "",
  battery: "",
  memory: "",
  countInStock: "",
  description: "",
};

function ProductEditScreen({ match, history }) {
  const productId = match.params.id;

  const [formData, setFormData] = useState(initialFormData);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        const productData = Object.keys(product)
          .filter((key) => initialFormData.hasOwnProperty(key))
          .reduce((acc, curr) => {
            acc[curr] = product[curr];
            return acc;
          }, {});
        setFormData(productData);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ _id: productId, ...formData }));
  };

  return (
    <div className="edit-page__container">
      <h2 className="text-center">Edit Product</h2>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          {Object.keys(initialFormData).map((key) => (
            <FormInput
              key={key}
              type={typeof formData[key] === "number" ? "number" : "text"}
              name={key}
              placeholder={`Enter ${key}`}
              value={formData[key]}
              handleChange={handleChange}
            />
          ))}
          <button type="submit" className="btn btn-main btn-full-width">
            Update
          </button>
        </Form>
      )}
    </div>
  );
}

export default ProductEditScreen;
