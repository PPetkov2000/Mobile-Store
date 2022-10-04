import { useCallback, useEffect, useState } from 'react'
import errorHandler from '../utils/errorHandler'

const useAsync = (func, dependencies = [], immediate = true) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [data, setData] = useState()

  const execute = useCallback((...params) => {
    setLoading(true)
    return func(...params)
      .then(({ data }) => {
        setData(data)
        setError(undefined)
        return data
      })
      .catch((error) => {
        const errorMessage = errorHandler(error)
        setError(errorMessage)
        setData(undefined)
        return Promise.reject(errorMessage)
      })
      .finally(() => {
        setLoading(false)
      })
  }, dependencies)

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { loading, error, data, execute }
}

export default useAsync
