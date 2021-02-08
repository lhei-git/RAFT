import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { InputsProvider } from './context/InputsContext';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <InputsProvider>
      <App />
    </InputsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
