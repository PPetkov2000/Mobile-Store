import React from "react";
import { Form } from "react-bootstrap";

function FormInput({
  type = "text",
  name,
  placeholder,
  value,
  handleChange,
  icon,
}) {
  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  return (
    <Form.Group controlId={name}>
      <Form.Label>
        {icon} {capitalize(name)}
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      ></Form.Control>
    </Form.Group>
  );
}

export default FormInput;
