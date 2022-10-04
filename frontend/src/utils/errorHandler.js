const errorHandler = (error) => {
  if (Array.isArray(error)) return error[0]
  return error.response?.data?.message || error?.message || error
}

export default errorHandler
