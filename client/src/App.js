import { useContext } from 'react';
import './App.css';
import Form from './components/Form';
import { InputsContext } from './context/InputsContext';

function App() {
  const { inputs } = useContext(InputsContext);

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
      <Form />
      <br />
      <p> Prediction (celsius): {inputs.model && inputs.model.prediction} </p>
      <p> MSE: {inputs.model.metrics && inputs.model.metrics.mse} </p>
      <p> R2: {inputs.model.metrics && inputs.model.metrics.r2} </p>
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
};

export default App;
