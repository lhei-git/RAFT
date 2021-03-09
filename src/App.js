import { useContext, useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Map from './components/Map';
import { InputsContext } from './context/InputsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import Results from './Results';

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
      <div className="default-view-container">
        <div className="default-view">
          <div className="title-logo">
            <div className="title">
              <h1>RAFT</h1>
              <h3>Regional Temperature Profiler</h3>
            </div>
            <div className="logo">
              <FontAwesomeIcon icon={faGlobeAmericas} size="10x" />
            </div>
          </div>
          <div className="form-map">
            <div className="form-container">
              <Form onSubmitPressed={onSubmitPressed} />
            </div>
            <div className="map">
              <Map />
            </div>
          </div>
        </div>
        <div id="results">{showResults ? <Results /> : ''}</div>
      </div>
    </div>
  );
}

const styles = {
  loginLegend: {
    margin: '20px',
    width: '155px',
  },
  myFieldset: {
    border: '3px solid',
    maxWidth: 'max-content',
    margin: '0 auto',
    marginBottom: '40px',
    paddingRight: '20px',
  },
  ol: {
    textAlign: 'left',
  },
  o2: {
    padding: '101px',
    border: '2px solid #000',
  },
  o3: {
    padding: '50px',
    border: '2px solid #000',
  },
};

export default App;
