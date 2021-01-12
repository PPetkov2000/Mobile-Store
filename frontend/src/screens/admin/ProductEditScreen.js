import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
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
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="images">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter images comma separated"
              value={images}
              onChange={(e) => setImages(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="cpu">
            <Form.Label>CPU</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter CPU"
              value={cpu}
              onChange={(e) => setCpu(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="camera">
            <Form.Label>Camera</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter camera"
              value={camera}
              onChange={(e) => setCamera(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="size">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="weight">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="display">
            <Form.Label>Display</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter display"
              value={display}
              onChange={(e) => setDisplay(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="battery">
            <Form.Label>Battery</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter battery"
              value={battery}
              onChange={(e) => setBattery(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="memory">
            <Form.Label>Memory</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter memory"
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

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
