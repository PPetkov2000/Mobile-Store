import React from "react";
import { Form } from "react-bootstrap";

function FormInput({ type = "text", name, placeholder, value, handleChange }) {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{name}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      ></Form.Control>
    </Form.Group>
  );
}

export default FormInput;
