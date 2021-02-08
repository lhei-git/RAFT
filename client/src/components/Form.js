import React, { useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import StateSelect from './StateSelect';
import CountySelect from './CountySelect';
import DropdownInput from './DropdownInputs';
import DataStationSelect from './DataStationSelect';
//import getModelData from '../context/InputsContext';
import { InputsContext } from '../context/InputsContext';

const InputForm = () => {
  const {
    inputs,
    selectState,
    selectCounty,
    selectStation,
    getCounties,
    getStations,
    getModelData,
    selectYear,
  } = useContext(InputsContext);

  useEffect(() => {
    getCounties(inputs.state);
    console.log(inputs.county);
  }, [inputs.state]);

  useEffect(() => {
    getStations(inputs.state, inputs.county);
    console.log(inputs.station);
  }, [inputs.state, inputs.county]);



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
        <DropdownInput
          label="Station"
          options={<DataStationSelect />}
          select={selectStation}
          value={inputs.station}
        />
      </Form>

      <Form.Group>
        <Form.Control
          size="sm"
          type="number"
          placeholder="Year"
          min="2022"
          max="9999"
          value={inputs.year}
          onChange={(e) => selectYear(e.target.value)}
        />
      </Form.Group>

      <Button
          variant="danger"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            getModelData(
              inputs.state,
              inputs.county,
              inputs.year,
              inputs.month,
              inputs.station
            );
          }}
        >
          Submit
        </Button>
    </div>
  );
};

export default InputForm;
