import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {BrowserRouter} from 'react-router-dom';

const Setting = {
  placeCounter: 1000,
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App placeCounter={Setting.placeCounter} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'));
