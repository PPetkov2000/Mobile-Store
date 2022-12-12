import api from '../utils/api-instance'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST })
    const { data } = await api.post('/api/v1/orders', order)
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
    dispatch({ type: CART_CLEAR_ITEMS, payload: data })
    localStorage.removeItem('cartItems')
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error })
  }
}

const listOrdersCache = new Map()
export const listOrders =
  (pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST })
      if (!listOrdersCache.has(pageNumber)) {
        const { data } = await api.get(`/api/v1/orders?pageNumber=${pageNumber}`)
        listOrdersCache.set(pageNumber, data)
      }
      dispatch({ type: ORDER_LIST_SUCCESS, payload: listOrdersCache.get(pageNumber) })
    } catch (error) {
      dispatch({ type: ORDER_LIST_FAIL, payload: error })
    }
  }

const listMyOrdersCache = new Map()
export const listMyOrders =
  (pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: ORDER_LIST_MY_REQUEST })
      if (!listMyOrdersCache.has(pageNumber)) {
        const { data } = await api.get(`/api/v1/orders/myorders?pageNumber=${pageNumber}`)
        listMyOrdersCache.set(pageNumber, data)
      }
      dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: listMyOrdersCache.get(pageNumber) })
    } catch (error) {
      dispatch({ type: ORDER_LIST_MY_FAIL, payload: error })
    }
  }

const getOrderDetailsCache = new Map()
export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })
    if (!getOrderDetailsCache.has(orderId)) {
      const { data } = await api.get(`/api/v1/orders/${orderId}`)
      getOrderDetailsCache.set(orderId, data)
    }
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: getOrderDetailsCache.get(orderId) })
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error })
  }
}

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST })
    const { data } = await api.put(`/api/v1/orders/${orderId}/pay`, paymentResult)
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error })
  }
}
