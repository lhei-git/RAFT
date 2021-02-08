import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { InputsContext } from '../context/InputsContext';

const DropdownInput = ({ label, options, select, value }) => {
  return (
    <Form.Group controlId="exampleForm.ControlSelect1">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        value={value}
        onChange={(e) => select(e.target.value)}
      >
        {options}
      </Form.Control>
    </Form.Group>
  );
};

export default DropdownInput;
