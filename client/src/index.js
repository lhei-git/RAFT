import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { InputsProvider } from './context/InputsContext';

ReactDOM.render(
  <React.StrictMode>
    <InputsProvider>
      <App />
    </InputsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
