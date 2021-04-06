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

  const splitByUppercase = (str) => {
    return str.match(/[A-Z][a-z]+/g)
      ? str.match(/[A-Z][a-z]+/g).join(" ")
      : str;
  };

  return (
    <Form.Group controlId={name}>
      <Form.Label>
        {icon} {splitByUppercase(capitalize(name))}
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      ></Form.Control>
    </Form.Group>
  );
}

export default FormInput;
