const ERROR_MESSAGES_BY_STATUS = {
  400: 'Bad request. Please provide the needed resources.',
  401: 'You are not authenticated to access this resource.',
  403: 'You are not authorized to access this resource.',
  404: 'The resource you are looking for does not exist.',
  429: 'Too many requests, please try again later.',
  500: 'Server error, please try again later.',
}

const addInterceptors = (instance) => {
  instance.interceptors.request.use(
    (request) => {
      console.log({ request })
      request.timeout = 5000
      if (!request.retry) request.retry = 0
      if (localStorage.getItem('userInfo')) {
        request.headers.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).token
        // request.headers.Cookie = `session=${Cookies.get('session')}`
      }
      return request
    },
    (error) => {
      console.log({ errorRequest: error })
      if (error.code === 'ECONNABORTED' && error.config.retry < 3) {
        error.config.retry++
        return instance(error.config)
      }
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response) => {
      console.log({ response })
      if (response.data.newAuthToken) {
        const userInfoFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
        const updatedUserInfo = { ...userInfoFromLocalStorage, token: 'Bearer ' + response.data.newAuthToken }
        localStorage.setItem('userInfo', updatedUserInfo)
      }
      return response
    },
    (error) => {
      if (error.code === 'ECONNABORTED') {
        return Promise.reject('Request took too long to complete')
      }
      if (error.response) {
        const status = error?.response?.status
        const errorMessage = Array.isArray(error)
          ? error[0]
          : error.response?.data?.message || ERROR_MESSAGES_BY_STATUS?.[status] || error?.message || error
        return Promise.reject(errorMessage)
      }
      if (error.request) {
        return Promise.reject('A network error occurred. Please check your internet connection and try again.')
      }
      return Promise.reject('An error occurred. Please try again.')
    }
  )
}

export default addInterceptors
