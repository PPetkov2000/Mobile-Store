import api from "../utils/api-instance";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstans";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_ADD_FAVOURITES_REQUEST,
  USER_ADD_FAVOURITES_SUCCESS,
  USER_ADD_FAVOURITES_FAIL,
  USER_REMOVE_FAVOURITES_REQUEST,
  USER_REMOVE_FAVOURITES_SUCCESS,
  USER_REMOVE_FAVOURITES_FAIL,
} from "../constants/userConstants";
import actionsErrorHandler from "../utils/actionsErrorHandler";

export const register = (username, email, password, confirmPassword) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await api.post("/api/v1/users/register", { username, email, password, confirmPassword });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: actionsErrorHandler(error) });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await api.post("/api/v1/users/login", { email, password });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: actionsErrorHandler(error) });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LIST_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  document.location.href = "/login";
};

export const listUsers = (pageNumber = "") => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const { data } = await api.get(`/api/v1/users?pageNumber=${pageNumber}`);
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LIST_FAIL, payload: actionsErrorHandler(error) });
  }
};

export const getUserDetails = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await api.get(`/api/v1/users/${userId}`);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: actionsErrorHandler(error) });
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const { data } = await api.put(`/api/v1/users/${user._id}`, user);
    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    dispatch({ type: USER_DETAILS_RESET });
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: actionsErrorHandler(error) });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    await api.delete(`/api/v1/users/${userId}`);
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_DELETE_FAIL, payload: actionsErrorHandler(error) });
  }
};

export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const { data } = await api.put(`/api/v1/users/profile`, user);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: actionsErrorHandler(error) });
  }
};

export const addToFavourites = (productId) => async (dispatch) => {
  try {
    dispatch({ type: USER_ADD_FAVOURITES_REQUEST });
    await api.put(`/api/v1/users/like`, { productId });
    dispatch({ type: USER_ADD_FAVOURITES_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_ADD_FAVOURITES_FAIL, payload: actionsErrorHandler(error) });
  }
};

export const removeFromFavourites = (productId) => async (dispatch) => {
  try {
    dispatch({ type: USER_REMOVE_FAVOURITES_REQUEST });
    await api.put(`/api/v1/users/dislike`, { productId });
    dispatch({ type: USER_REMOVE_FAVOURITES_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_REMOVE_FAVOURITES_FAIL, payload: actionsErrorHandler(error) });
  }
};
