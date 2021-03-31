import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createProduct } from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
import FormInput from "../../components/FormInput";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const ProductCreateScreen = () => {
  const [name, setName] = useState("");
  const [images, setImages] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [cpu, setCpu] = useState("");
  const [camera, setCamera] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [display, setDisplay] = useState("");
  const [battery, setBattery] = useState("");
  const [memory, setMemory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success, product } = productCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push("/admin/productlist");
    }
  }, [dispatch, history, success, product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(
        createProduct({
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-create__container">
      <h2 className="text-center">Create Product</h2>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <FormInput
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <FormInput
          type="text"
          name="images"
          placeholder="Enter images urls (start with /images/:name)"
          value={images}
          handleChange={(e) => setImages(e.target.value)}
        />
        <FormInput
          type="text"
          name="brand"
          placeholder="Enter brand"
          value={brand}
          handleChange={(e) => setBrand(e.target.value)}
        />
        <FormInput
          type="number"
          name="price"
          placeholder="Enter price"
          value={price}
          handleChange={(e) => setPrice(e.target.value)}
        />
        <FormInput
          type="text"
          name="cpu"
          placeholder="Enter cpu"
          value={cpu}
          handleChange={(e) => setCpu(e.target.value)}
        />
        <FormInput
          type="text"
          name="camera"
          placeholder="Enter camera"
          value={camera}
          handleChange={(e) => setCamera(e.target.value)}
        />
        <FormInput
          type="text"
          name="size"
          placeholder="Enter size"
          value={size}
          handleChange={(e) => setSize(e.target.value)}
        />
        <FormInput
          type="text"
          name="weight"
          placeholder="Enter weight"
          value={weight}
          handleChange={(e) => setWeight(e.target.value)}
        />
        <FormInput
          type="text"
          name="display"
          placeholder="Enter display"
          value={display}
          handleChange={(e) => setDisplay(e.target.value)}
        />
        <FormInput
          type="text"
          name="battery"
          placeholder="Enter battery"
          value={battery}
          handleChange={(e) => setBattery(e.target.value)}
        />
        <FormInput
          type="text"
          name="memory"
          placeholder="Enter memory"
          value={memory}
          handleChange={(e) => setMemory(e.target.value)}
        />
        <FormInput
          type="number"
          name="count in stock"
          placeholder="Enter count in stock"
          value={countInStock}
          handleChange={(e) => setCountInStock(e.target.value)}
        />
        <FormInput
          type="number"
          name="quantity"
          placeholder="Enter quantity"
          value={quantity}
          handleChange={(e) => setQuantity(e.target.value)}
        />
        <FormInput
          type="text"
          name="description"
          placeholder="Enter description"
          value={description}
          handleChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="btn btn-main btn-full-width">
          Create
        </button>
      </Form>
    </div>
  );
};

export default ProductCreateScreen;
