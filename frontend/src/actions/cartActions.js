import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      images: data.images,
      brand: data.brand,
      price: data.price,
      cpu: data.cpu,
      camera: data.camera,
      size: data.size,
      weight: data.weight,
      display: data.display,
      battery: data.battery,
      memory: data.memory,
      description: data.description,
      countInStock: data.countInStock,
      quantity: Number(quantity),
      rating: data.rating,
      reviews: data.reviews,
      product: data._id,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
