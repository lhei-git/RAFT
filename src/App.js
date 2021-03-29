import { useContext, useEffect, useState } from 'react';
import './App.css';

import Form from './components/Form';
import Map from './components/Map';
import ErrorMessage from './components/ErrorMessage';
import Results from './components/Results';

import { InputsContext } from './context/InputsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

import Geocode from 'react-geocode';
Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);
Geocode.setLanguage('en');
Geocode.enableDebug();

function App() {
  const { inputs, getLatLng, getLatLngCounty } = useContext(InputsContext);
  const [showResults, setShowResults] = useState(false);
  const [getData, setGetData] = useState(false);

  const [open, setOpen] = useState(false);
  const [spin, setSpin] = useState(false);

  const toggleHover = () => setSpin(!spin);

  useEffect(() => {
    if (inputs.errorMessage !== '') setOpen(true);
  }, [inputs.errorMessage]);

  useEffect(() => {
    if (inputs.state !== '') getLatLng(inputs.state);
  }, [inputs.state]);
  useEffect(() => {
    if (inputs.state !== '') getLatLngCounty(inputs.county, inputs.state);
  }, [inputs.county]);

  const onSubmitPressed = () => setShowResults(true);

  return (
    <div className="App">
      <div className="default-view-container">
        <div className="default-view">
          <div className="title-logo">
            <div className="title">
              <FontAwesomeIcon
                className={spin ? 'fa-spin' : ''}
                onMouseLeave={toggleHover}
                onMouseEnter={toggleHover}
                icon={faGlobeAmericas}
                style={{ fontSize: '2.7rem', verticalAlign: '0rem' }}
              />
              <h1 style={{ paddingLeft: '10px' }}>RAFT</h1>
            </div>
            {/* <div className="logo">
            </div> */}
          </div>
          <div className="hero">
            <div className="hero-container">
              <div className="information">
                <h3 style={{ paddingBottom: '.5rem' }}>
                  Regional Temperature Profiler
                </h3>
                <p>
                  RTP is an application that uses a linear regression model that{' '}
                  <br />
                  will help you find a predicted temperature in a chosen county
                  and year.
                </p>
                <p>Choose a state to get started!</p>
              </div>
              <div className="inner-hero-cont">
                <Form
                  getData={getData}
                  setGetData={setGetData}
                  onSubmitPressed={onSubmitPressed}
                  setOpen={setOpen}
                  open={open}
                />
                <div className="map">
                  <Map />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div id="results"> */}
          {showResults ? <Results getData={getData} /> : ''}
        {/* </div> */}
      </div>
      <footer
        style={{
          backgroundColor: '#f8f8ff',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p style={{ margin: '0', paddingRight: '10px' }}>&#169; 2021</p>
        <a href="https://www.lhei.org">lhei.org</a>
        <a style={{ paddingLeft: '10px' }} href="#">
          About Link
        </a>
      </footer>

      {open ? (
        <ErrorMessage
          setOpen={setOpen}
          open={open}
          message={inputs.errorMessage}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
