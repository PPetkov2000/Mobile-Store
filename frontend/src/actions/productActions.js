import api from '../utils/api-instance'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_DELETE_REVIEW_REQUEST,
  PRODUCT_DELETE_REVIEW_SUCCESS,
  PRODUCT_DELETE_REVIEW_FAIL,
  PRODUCT_ADD_FAVOURITES_REQUEST,
  PRODUCT_ADD_FAVOURITES_SUCCESS,
  PRODUCT_ADD_FAVOURITES_FAIL,
  PRODUCT_REMOVE_FAVOURITES_REQUEST,
  PRODUCT_REMOVE_FAVOURITES_SUCCESS,
  PRODUCT_REMOVE_FAVOURITES_FAIL,
} from '../constants/productConstants'
import actionsErrorHandler from '../utils/actionsErrorHandler'

const listProductsCache = new Map()
export const listProducts =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })
      const cacheKey = keyword + pageNumber
      if (!listProductsCache.has(cacheKey)) {
        const { data } = await api.get(`/api/v1/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        listProductsCache.set(cacheKey, data)
      }
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: listProductsCache.get(cacheKey) })
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: actionsErrorHandler(error) })
    }
  }

const listProductDetailsCache = new Map()
export const listProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    if (!listProductDetailsCache.has(productId)) {
      const { data } = await api.get(`/api/v1/products/${productId}`)
      listProductDetailsCache.set(productId, data)
    }
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: listProductDetailsCache.get(productId) })
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: actionsErrorHandler(error) })
  }
}

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST })
    const { data } = await api.post('/api/v1/products', product)
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: actionsErrorHandler(error) })
  }
}

export const updateProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST })
    const { data } = await api.put(`/api/v1/products/${product._id}`, product)
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: actionsErrorHandler(error) })
  }
}

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })
    await api.delete(`/api/v1/products/${productId}`)
    dispatch({ type: PRODUCT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: actionsErrorHandler(error) })
  }
}

const listTopProductsCache = new Map()
export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST })
    const cacheKey = 'listTopProducts'
    if (!listTopProductsCache.has(cacheKey)) {
      const { data } = await api.get('/api/v1/products/top')
      listTopProductsCache.set(cacheKey, data)
    }
    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: listTopProductsCache.get(cacheKey) })
  } catch (error) {
    dispatch({ type: PRODUCT_TOP_FAIL, payload: actionsErrorHandler(error) })
  }
}

export const createProductReview = (productId, review) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })
    await api.post(`/api/v1/products/${productId}/reviews`, review)
    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS })
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_REVIEW_FAIL, payload: actionsErrorHandler(error) })
  }
}

export const deleteProductReview = (productId, reviewId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REVIEW_REQUEST })
    const { data } = await api.delete(`/api/v1/products/${productId}/reviews/${reviewId}`)
    dispatch({ type: PRODUCT_DELETE_REVIEW_SUCCESS })
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product })
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_REVIEW_FAIL, payload: actionsErrorHandler(error) })
  }
}

export const addToFavourites = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ADD_FAVOURITES_REQUEST })
    await api.put(`/api/v1/products/${productId}/like`)
    dispatch({ type: PRODUCT_ADD_FAVOURITES_SUCCESS })
  } catch (error) {
    dispatch({ type: PRODUCT_ADD_FAVOURITES_FAIL, payload: actionsErrorHandler(error) })
  }
}

export const removeFromFavourites = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REMOVE_FAVOURITES_REQUEST })
    await api.put(`/api/v1/products/${productId}/dislike`)
    dispatch({ type: PRODUCT_REMOVE_FAVOURITES_SUCCESS })
  } catch (error) {
    dispatch({ type: PRODUCT_REMOVE_FAVOURITES_FAIL, payload: actionsErrorHandler(error) })
  }
}
