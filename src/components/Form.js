import React, { useContext } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import StateSelect from './Dropdowns/StateSelect';
import CountySelect from './Dropdowns/CountySelect';
import DropdownInput from './DropdownInputs';
import DataStationSelect from './Dropdowns/DataStationSelect';
import MonthSelect from './Dropdowns/MonthSelect';
import SeasonSelect from './Dropdowns/SeasonSelect';
import { InputsContext } from '../context/InputsContext';
import ToggleSwitch from './ToggleSwitch';

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
    selectSeason,
  } = useContext(InputsContext);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Form>
        <Form.Row>
          <Col xs="3">
            <DropdownInput
              label="State"
              options={<StateSelect />}
              select={selectState}
              value={inputs.state}
              get={() => getCounties(inputs.state)}
            />
          </Col>
          <Col xs="3">
            <DropdownInput
              label="County"
              options={<CountySelect />}
              select={selectCounty}
              value={inputs.county}
              get={() => getStations(inputs.state, inputs.county)}
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
        <Form.Row
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ToggleSwitch />
          <Col xs="auto" md="4">
            <DropdownInput
              label="Month"
              options={<MonthSelect />}
              select={selectMonth}
              value={inputs.month}
            />
          </Col>
          <Col xs="auto" md="4">
            <DropdownInput
              label="Season"
              options={<SeasonSelect />}
              select={selectSeason}
              value={inputs.season}
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
