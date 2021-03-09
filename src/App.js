import { useContext, useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Map from './components/Map';
import { InputsContext } from './context/InputsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import Results from './Results';

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
      <Container fluid className="pp">
        {/*
          ==============================
                  TITLE & LOGO
          ==============================
        */}
        <Row>
          <Col
            style={styles.paddingFifteen}
            xs={{ span: 12, order: 2 }}
            lg={{ span: 5, offset: 1, order: 1 }}
          >
            <h1 className="text-large-lg">RTP</h1>
            <h3 className="subtext-large-lg">Regional Temperature Profiler</h3>
          </Col>
          <Col
            xs={{ span: 12, order: 1 }}
            lg={{ span: 3, offset: 3, order: 2 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '15px',
            }}
          >
            <FontAwesomeIcon icon={faGlobeAmericas} size="10x" />
          </Col>
        </Row>

        {/*
          ==============================
                  FORM & MAP
          ==============================
        */}
        <Row className="vertical-center-lg">
          <Col
            // FORM
            style={styles.paddingTwenty}
            xs={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 8, offset: 2 }}
            xl={{ span: 4, offset: 1 }}
          >
            <Form onSubmitPressed={onSubmitPressed} />
          </Col>
          <Col
            // MAP
            xs={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 10, offset: 1 }}
            xl={{ span: 6, offset: 0 }}
          >
            <Map />
          </Col>
        </Row>
      </Container>

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
