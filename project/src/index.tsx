import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  placeCounter: 1000,
};

ReactDOM.render(
  <React.StrictMode>
    <App placeCounter={Setting.placeCounter} />
  </React.StrictMode>,
  document.getElementById('root'));
