import './App.css';
import noaaApi from './APIs/noaaApi';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <h1>Welcome to RAFT!</h1>
      <h2>Instructions:</h2>
      <p>1. Pick a state you would like to see the future temperature of.</p>
      <p>2. Pick a county within that state.</p>
      <p>3. Pick a data station within that county.</p>
      <p>4. Enter a year you would like to see the temeperature for.</p>
      <p>5. Press submit and see the estimated future temperature.</p>
      <Form />
    </div>
  );
}

export default App;
