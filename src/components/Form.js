import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import StateSelect from './Dropdowns/StateSelect';
import CountySelect from './Dropdowns/CountySelect';
import DropdownInput from './DropdownInputs';
import DataStationSelect from './Dropdowns/DataStationSelect';
import MonthSelect from './Dropdowns/MonthSelect';
import SeasonSelect from './Dropdowns/SeasonSelect';
import { InputsContext } from '../context/InputsContext';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-scroll';

const InputForm = ({ onSubmitPressed, setReady, ready }) => {
  const [show, setShow] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
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
    getTrainingData,
  } = useContext(InputsContext);

  useEffect(() => {
    if (inputs.state && inputs.county && inputs.month) {
      setFormFilled(true)
      console.log('entered')
    }
  }, [inputs.state, inputs.county, inputs.month])


  const LoadingSpinner = () => {
    return (
      <Spinner
        style={{
          position: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        animation="border"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  };

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
        { formFilled ?
        <Link
          activeClass="active"
          to={'results'}
          spy={true}
          smooth={true}
          duration={1000}
          delay={3000}
          href={'results'}
          onClick={(e) => {
            e.preventDefault();
            getModelData(inputs.year, inputs.month).then(() => {
              console.log(inputs.model)
              setReady(true);
              setShow(false);
            });
            getClusters();
            getTrainingData();
            setShow(true);
            // setTimeout(() => setShow(false), 5000);
            onSubmitPressed();
          }}
        >
          <Button variant="danger" type="submit">
            {show ? (
              <Spinner
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                animation="border"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              'Submit'
            )}
          </Button>
        </Link>
        :
          <Button variant="danger" type="submit" onClick={(e) => {
            e.preventDefault();
            alert('Please finish filling out the form.')
          }}>
              {formFilled ?
              'Submit' : 'Form not Filled'}
          </Button>
      }
      </Form>
    </div>
  );
};

export default InputForm;
