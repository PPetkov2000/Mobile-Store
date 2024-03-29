import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const FormInput = ({ label, handleChange, errorMessage, icon, id, labelClass, parentClass, ...inputProps }) => {
  const [focused, setFocused] = useState(false)

  return (
    <Form.Group controlId={inputProps.name} className={parentClass}>
      {label && (
        <Form.Label className={labelClass}>
          {icon && <i className={icon} aria-hidden="true" />} {label}
        </Form.Label>
      )}
      {inputProps.type === 'checkbox' ? (
        <Form.Check {...inputProps} onChange={handleChange} />
      ) : (
        <Form.Control {...inputProps} onChange={handleChange} onBlur={() => setFocused(true)} focused={focused.toString()} />
      )}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </Form.Group>
  )
}

export default FormInput
