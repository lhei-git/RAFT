import { useContext, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import Map from './components/Map';
import { InputsContext } from './context/InputsContext';

import Geocode from 'react-geocode';
Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);
Geocode.setLanguage('en');
Geocode.enableDebug();

function App() {
  const { inputs, getLatLng, getLatLngCounty } = useContext(InputsContext);

  useEffect(() => {
    getLatLng(inputs.state);
  }, [inputs.state]);
  useEffect(() => {
    getLatLngCounty(inputs.county, inputs.state);
  }, [inputs.county]);

  return (
    <div className="App">
      <h1>Welcome to RAFT!</h1>
      <fieldset style={styles.myFieldset}>
        <legend style={styles.loginLegend}>Instructions</legend>
        <ol style={styles.ol}>
          <li>Pick a state you would like to see the future temperature of.</li>
          <li>Pick a county within that state.</li>
          <li>Pick a data station within that county.</li>
          <li>Enter a year you would like to see the temperature for.</li>
          <li>Press submit and see the estimated future temperature.</li>
        </ol>
      </fieldset>
      <div className="box">
        <o2 style={styles.o2}>
          <Form />
        </o2>
        <o3 style={styles.o3}>
          <Map />
        </o3>
      </div>
      <br />
      {inputs.errorMessage && inputs.errorMessage} <br />
      <div className="results">
        <p> Prediction (celsius): {inputs.model && inputs.model.prediction} </p>
        <p> MSE: {inputs.model.metrics && inputs.model.metrics.mse} </p>
        <p> R2: {inputs.model.metrics && inputs.model.metrics.r2} </p>
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
