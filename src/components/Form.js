import React, { useEffect, useContext } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import StateSelect from './StateSelect';
import CountySelect from './CountySelect';
import DropdownInput from './DropdownInputs';
import DataStationSelect from './DataStationSelect';
import MonthSelect from './MonthSelect';
import { InputsContext } from '../context/InputsContext';

const InputForm = () => {
  const {
    inputs,
    selectState,
    selectCounty,
    selectStation,
    selectMonth,
    getCounties,
    getStations,
    getModelData,
    selectYear,
  } = useContext(InputsContext);

  useEffect(() => {
    getCounties(inputs.state);
    console.log("chosen county", inputs.county);
  }, [inputs.state]);

  useEffect(() => {
    getStations(inputs.state, inputs.county);
    console.log("STATION", inputs.station);
  }, [inputs.county]);

  useEffect(() => {
    console.log("selected station", inputs.station)
  }, [inputs.station])

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Form>
        <Form.Row>
          <Col xs="3">
            <DropdownInput
              label="State"
              options={<StateSelect />}
              select={selectState}
              value={inputs.state}
            />
          </Col>
          <Col xs="3">
            <DropdownInput
              label="County"
              options={<CountySelect />}
              select={selectCounty}
              value={inputs.county}
            />
          </Col>
          <Col xs="6">
            <DropdownInput
              label="Station"
              options={<DataStationSelect />}
              select={selectStation}
              value={inputs.station}
            />
          </Col>
        </Form.Row>
        <Form.Row style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Col xs="auto" md="4">
            <DropdownInput
              label="Month"
              options={<MonthSelect />}
              select={selectMonth}
              value={inputs.month}
            />
          </Col>
          <Col xs="auto">
            <Form.Group>
              <Form.Label>Year to Predict: </Form.Label>
              <Form.Control
                size="md"
                type="number"
                placeholder="Year"
                min="2022"
                max="9999"
                value={inputs.year}
                onChange={(e) => selectYear(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Form.Row>

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
        </Form>
    </div>
  );
};

export default InputForm;
