import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {BrowserRouter} from 'react-router-dom';
import {offers} from './fixture/offers';
import {comments} from './fixture/comment';
import {Provider} from 'react-redux';
import {store} from './store';
import {fetchOffersAction} from './store/async-actions';

store.dispatch(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App offers={offers} comments={comments} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
