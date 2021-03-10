import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';

const DropdownInput = ({ label, options, select, value, get }) => {
  useEffect(() => {
    if (value !== '') {
      // if the get prop exists
      get && get();
    }
  }, [value]);

  return (
    <Form.Group controlId="exampleForm.ControlSelect1">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className="dropdown-input"
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
