import { useState, useCallback } from 'react'

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState)

  const handleChange = useCallback((e) => {
    setFormData((data) => ({ ...data, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  }, [])

  return { formData, setFormData, handleChange }
}

export default useForm
