import React, { useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import StateSelect from './StateSelect';
import CountySelect from './CountySelect';
import DropdownInput from './DropdownInputs';
import DataStationSelect from './DataStationSelect';
import { InputsContext } from '../context/InputsContext';

const InputForm = () => {
  const {
    inputs,
    selectState,
    selectCounty,
    selectStation,
    getCounties,
  } = useContext(InputsContext);

  useEffect(() => {
    getCounties(inputs.state);
  }, [inputs.state]);

  return (
    <div>
      <Form>
        <DropdownInput
          label="State"
          options={<StateSelect />}
          select={selectState}
          value={inputs.state}
        />
        <DropdownInput
          label="County"
          options={<CountySelect />}
          select={selectCounty}
          value={inputs.county}
        />
        <DropdownInput label="Data Station" options={<DataStationSelect />} />
      </Form>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </div>
  );
};

export default InputForm;
