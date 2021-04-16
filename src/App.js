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
                      style={{ fontSize: '2.7rem', verticalAlign: '0rem' }}
                    />
                    <h1 style={{ paddingLeft: '10px' }}>
                      <a href="/" className="logo">
                        RAFT
                      </a>
                    </h1>
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
                        RTP is an application to help people understand
                        historical temperature changes and potential future{' '}
                        <br />
                        average temperatures for a particular region (a county
                        of a US state). The application uses data from NOAA
                        <br /> to present average temperature pre and post 1980;
                        clusters of low, middle and high temperatures over time;
                        <br />
                        and uses a linear model to predict future average
                        temperatures for a particular year.
                        <p> </p>
                        <p>
                          Choose a specific county, month and a future year of
                          interest to get started!
                        </p>
                      </p>
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
              <a style={{ paddingLeft: '10px' }} href="/about">
                About
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
