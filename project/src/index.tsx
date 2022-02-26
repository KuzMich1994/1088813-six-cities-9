import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {BrowserRouter} from 'react-router-dom';
import {offers} from './fixture/offer';
import {comments} from './fixture/comment';

const Setting = {
  placeCounter: 1000,
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App placeCounter={Setting.placeCounter} offers={offers} comments={comments} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'));
