import React from 'react';
import { Form, form } from 'react-bootstrap';

const DropdownInput = ({ label, options }) => {
  return (
    <Form.Group controlId="exampleForm.ControlSelect1">
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select">{options}</Form.Control>
    </Form.Group>
  );
};

export default DropdownInput;
