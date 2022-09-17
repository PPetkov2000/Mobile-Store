import { useState } from 'react'

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  }

  return { formData, setFormData, handleChange }
}

export default useForm
