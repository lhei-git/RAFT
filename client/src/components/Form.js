import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import StateSelect from './StateSelect';
import CountySelect from './CountySelect';
import DropdownInput from './DropdownInputs';
import DataStationSelect from './DataStationSelect';

const InputForm = () => {
  return (
    <div>
      <Form>
        <DropdownInput label="State" options={<StateSelect />} />
        <DropdownInput label="County" options={<CountySelect />} />
        <DropdownInput label="Data Station" options={<DataStationSelect />} />
      </Form>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </div>
  );
};

export default InputForm;
