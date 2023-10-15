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
import CacheManager from '../utils/cache-manager'

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

export const listOrders =
  (pageNumber = '') =>
  async (dispatch) => {
    const cacheKey = `orders?pageNumber=${pageNumber}`
    try {
      dispatch({ type: ORDER_LIST_REQUEST })
      if (!CacheManager.get(cacheKey)) {
        const { data } = await api.get(`/api/v1/orders?pageNumber=${pageNumber}`)
        CacheManager.set(cacheKey, data)
      }
      dispatch({ type: ORDER_LIST_SUCCESS, payload: CacheManager.get(cacheKey) })
    } catch (error) {
      dispatch({ type: ORDER_LIST_FAIL, payload: error })
    }
  }

export const listMyOrders =
  (pageNumber = '') =>
  async (dispatch) => {
    const cacheKey = `orders/myorders?pageNumber=${pageNumber}`
    try {
      dispatch({ type: ORDER_LIST_MY_REQUEST })
      if (!CacheManager.get(cacheKey)) {
        const { data } = await api.get(`/api/v1/orders/myorders?pageNumber=${pageNumber}`)
        CacheManager.set(cacheKey, data)
      }
      dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: CacheManager.get(cacheKey) })
    } catch (error) {
      dispatch({ type: ORDER_LIST_MY_FAIL, payload: error })
    }
  }

export const getOrderDetails = (orderId) => async (dispatch) => {
  const cacheKey = `orders/${orderId}`
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })
    if (!CacheManager.get(cacheKey)) {
      const { data } = await api.get(`/api/v1/orders/${orderId}`)
      CacheManager.set(cacheKey, data)
    }
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: CacheManager.get(cacheKey) })
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
