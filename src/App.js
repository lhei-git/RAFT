import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';

import About from './components/About';
import Form from './components/Form';
import Map from './components/Map';
import ErrorMessage from './components/ErrorMessage';
import Results from './components/Results';

import { InputsContext } from './context/InputsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

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
    <Router>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
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
                      style={{
                        fontSize: '2.7rem',
                        verticalAlign: '0rem',
                        color: 'aliceblue',
                      }}
                    />
                    <h1 style={{ paddingLeft: '10px' }}>
                      <a href="/about" className="logo">
                        RAFT
                      </a>
                    </h1>
                  </div>
                </div>
                <div className="hero">
                  <div className="hero-container">
                    <div className="information">
                      <div className="rtp">
                        <h3 style={{ paddingBottom: '.5rem' }}>
                          Regional Temperature Profiler
                        </h3>
                      </div>
                      <p>
                        RTP uses data from NOAA to calculate mean, high and low
                        average temperatures;
                        <br />
                        clusters of low, middle and high average temperatures;
                        and predictions
                        <br />
                        of future average temperatures for specific US counties.
                      </p>
                    </div>
                    <div className="inner-hero-cont">
                      <p style={{ color: 'aliceblue' }}>
                        Choose a specific county, month and a future year of
                        interest to get started!
                      </p>
                      <Form
                        getData={getData}
                        setGetData={setGetData}
                        onSubmitPressed={onSubmitPressed}
                        setOpen={setOpen}
                        open={open}
                      />
                      {/* <div className="map">
                        <Map />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section id="map-section">
              <div className="map">
                <Map />
              </div>
            </section>
            <div id="results">
              {showResults ? (
                <Card>
                  <CardContent>
                    <Results getData={getData} />
                  </CardContent>
                </Card>
              ) : (
                ''
              )}
            </div>
            <footer
              style={{
                backgroundColor: '#f8f8ff',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '1em',
              }}
            >
              <p style={{ margin: '0', paddingRight: '10px' }}>&#169; 2021</p>
              <a href="https://www.lhei.org">lhei.org</a>
              <a style={{ paddingLeft: '10px' }} href="/about">
                about
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
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
