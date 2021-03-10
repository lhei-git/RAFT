import React, { useContext } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import StateSelect from './Dropdowns/StateSelect';
import CountySelect from './Dropdowns/CountySelect';
import DropdownInput from './DropdownInputs';
import DataStationSelect from './Dropdowns/DataStationSelect';
import MonthSelect from './Dropdowns/MonthSelect';
import SeasonSelect from './Dropdowns/SeasonSelect';
import { InputsContext } from '../context/InputsContext';
import { Link } from 'react-scroll';

const InputForm = ({ onSubmitPressed }) => {
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
    getClusters,
    getTrainingData
  } = useContext(InputsContext);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Form className="form">
        <Form.Row
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <DropdownInput
            label="State"
            options={<StateSelect />}
            select={selectState}
            value={inputs.state}
            get={() => getCounties(inputs.state)}
          />
          <DropdownInput
            label="County"
            options={<CountySelect />}
            select={selectCounty}
            value={inputs.county}
            get={() => getStations(inputs.state, inputs.county)}
          />
        </Form.Row>
        <Form.Row
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <DropdownInput
            label="Month"
            options={<MonthSelect />}
            select={selectMonth}
            value={inputs.month}
          />
          <Form.Group>
            <Form.Label>Year to Predict: </Form.Label>
            <Form.Control
              className="year-input"
              size="md"
              type="number"
              placeholder="Year"
              min="2025"
              max="2050"
              value={inputs.year}
              onChange={(e) => selectYear(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Link
          activeClass="active"
          to={'results'}
          spy={true}
          smooth={true}
          duration={1000}
          href={'results'}
          onClick={(e) => {
            e.preventDefault();
            onSubmitPressed();
            getModelData(
              inputs.year,
              inputs.month,
            );
            getClusters()
            getTrainingData()
          }}
        >
          <Button variant="danger" type="submit">
            Submit
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default InputForm;
