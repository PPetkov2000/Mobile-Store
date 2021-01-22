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

function ProductEditScreen({ match, history }) {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [images, setImages] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [cpu, setCpu] = useState("");
  const [camera, setCamera] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [display, setDisplay] = useState("");
  const [battery, setBattery] = useState("");
  const [memory, setMemory] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");

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
        setName(product.name);
        setImages(product.images);
        setBrand(product.brand);
        setPrice(product.price);
        setCpu(product.cpu);
        setCamera(product.camera);
        setSize(product.size);
        setWeight(product.weight);
        setDisplay(product.display);
        setBattery(product.battery);
        setMemory(product.memory);
        setCountInStock(product.countInStock);
        setQuantity(product.quantity);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        images,
        brand,
        price,
        cpu,
        camera,
        size,
        weight,
        display,
        battery,
        memory,
        countInStock,
        quantity,
        description,
      })
    );
  };

  return (
    <div className="product-edit-page-container">
      <h3 className="text-center">Edit Product</h3>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <FormInput
            type="text"
            name="Name"
            placeholder="Enter name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormInput
            type="text"
            name="Images"
            placeholder="Enter images"
            value={images}
            handleChange={(e) => setImages(e.target.value)}
          />
          <FormInput
            type="text"
            name="Brand"
            placeholder="Enter brand"
            value={brand}
            handleChange={(e) => setBrand(e.target.value)}
          />
          <FormInput
            type="number"
            name="Price"
            placeholder="Enter price"
            value={price}
            handleChange={(e) => setPrice(e.target.value)}
          />
          <FormInput
            type="text"
            name="CPU"
            placeholder="Enter cpu"
            value={cpu}
            handleChange={(e) => setCpu(e.target.value)}
          />
          <FormInput
            type="text"
            name="Camera"
            placeholder="Enter camera"
            value={camera}
            handleChange={(e) => setCamera(e.target.value)}
          />
          <FormInput
            type="text"
            name="Size"
            placeholder="Enter size"
            value={size}
            handleChange={(e) => setSize(e.target.value)}
          />
          <FormInput
            type="text"
            name="Weight"
            placeholder="Enter weight"
            value={weight}
            handleChange={(e) => setWeight(e.target.value)}
          />
          <FormInput
            type="text"
            name="Display"
            placeholder="Enter display"
            value={display}
            handleChange={(e) => setDisplay(e.target.value)}
          />
          <FormInput
            type="text"
            name="Battery"
            placeholder="Enter battery"
            value={battery}
            handleChange={(e) => setBattery(e.target.value)}
          />
          <FormInput
            type="text"
            name="Memory"
            placeholder="Enter memory"
            value={memory}
            handleChange={(e) => setMemory(e.target.value)}
          />
          <FormInput
            type="number"
            name="Count In Stock"
            placeholder="Enter count in stock"
            value={countInStock}
            handleChange={(e) => setCountInStock(e.target.value)}
          />
          <FormInput
            type="number"
            name="Quantity"
            placeholder="Enter quantity"
            value={quantity}
            handleChange={(e) => setQuantity(e.target.value)}
          />
          <FormInput
            type="text"
            name="Description"
            placeholder="Enter description"
            value={description}
            handleChange={(e) => setDescription(e.target.value)}
          />

          <button
            type="submit"
            className="btn full-width product-edit-page-btn"
          >
            Update
          </button>
        </Form>
      )}
    </div>
  );
}

export default ProductEditScreen;
