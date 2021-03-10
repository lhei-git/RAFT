import { useContext, useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Map from './components/Map';
import { InputsContext } from './context/InputsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import Results from './Results';

import './components/Form.css'

import { Container, Row, Col } from 'react-bootstrap';

import Geocode from 'react-geocode';
Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);
Geocode.setLanguage('en');
Geocode.enableDebug();

function App() {
  const { inputs, getLatLng, getLatLngCounty } = useContext(InputsContext);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    getLatLng(inputs.state);
  }, [inputs.state]);
  useEffect(() => {
    getLatLngCounty(inputs.county, inputs.state);
  }, [inputs.county]);

  const onSubmitPressed = () => setShowResults(!showResults);

  return (
    <div className="App">
        {/*
          ==============================
                  TITLE & LOGO
          ==============================
        */}
          <div className="title">
            <div className="titleText">
              <h1 className="text-large-lg">RTP</h1>
              <h3 className="subtext-large-lg">Regional Temperature Profiler</h3>
            </div>
            <div className="logo">
              <FontAwesomeIcon icon={faGlobeAmericas} size="10x" />
            </div>
          </div>

        {/*
          ==============================
                  FORM & MAP
          ==============================
        */}
          <div className="default-content">
              <Form onSubmitPressed={onSubmitPressed} />
              <Map  className='map_'/>
          </div>

      {/* { <div className="default-view-container">
        <div className="default-view">
          <div className="title-logo">
            <div className="title">
              <h1>RTP</h1>
              <h3>Regional Temperature Profiler</h3>
            </div>
            <div className="logo">
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: 'lightslategray',
                }}
              ></div>
            </div>
          </div>

          <div className="form-map">
            <div className="form">
              <Form />
            </div>
            <div className="map-container">
              <Map />
            </div>
          </div>
        </div>
      </div> */}
      <div id="results">{showResults ? <Results /> : ''}</div>
    </div>
  );
}

const styles = {
  paddingFifteen: {
    padding: '15px',
  },
  paddingTwenty: {
    padding: '20px',
  },
};

export default App;
