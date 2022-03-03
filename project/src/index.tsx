import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {BrowserRouter} from 'react-router-dom';
import {offers} from './fixture/offers';
import {comments} from './fixture/comment';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App offers={offers} comments={comments} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'));
