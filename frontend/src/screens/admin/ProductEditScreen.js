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
  const [brand, setBrand] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [OS, setOS] = useState("");
  const [memory, setMemory] = useState(0);
  const [RAM, setRAM] = useState(0);
  const [network, setNetwork] = useState("");
  const [SIM, setSIM] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [weight, setWeight] = useState(0);
  const [color, setColor] = useState("");
  const [countInStock, setCountInStock] = useState(0);

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
        setBrand(product.brand);
        setImageUrl(product.imageUrl);
        setOS(product.OS);
        setMemory(product.memory);
        setRAM(product.RAM);
        setNetwork(product.network);
        setSIM(product.SIM);
        setPrice(product.price);
        setSize(product.size);
        setWeight(product.weight);
        setColor(product.color);
        setCountInStock(product.countInStock);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        brand,
        imageUrl,
        OS,
        memory,
        RAM,
        network,
        SIM,
        price,
        size,
        weight,
        color,
        countInStock,
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
          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="imageUrl">
            <Form.Label>Image url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="OS">
            <Form.Label>OS</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OS"
              value={OS}
              onChange={(e) => setOS(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="memory">
            <Form.Label>Memory</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter memory"
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="RAM">
            <Form.Label>RAM</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter RAM"
              value={RAM}
              onChange={(e) => setRAM(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="network">
            <Form.Label>Network</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter network"
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="SIM">
            <Form.Label>SIM</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter SIM"
              value={SIM}
              onChange={(e) => setSIM(e.target.value)}
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
          <Form.Group controlId="size">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="weight">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="color">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
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
