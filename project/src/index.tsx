import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './fixture/offers';
import {comments} from './fixture/comment';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthStatus, fetchOffersAction} from './store/async-actions';
import ErrorMessage from './components/error-message/error-message';
import HistoryRoute from './components/history-route/history-route';
import browserHistory from './browser-history';
import {AppRoute} from './const';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthStatus());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRoute history={browserHistory} basename={AppRoute.Root}>
        <ErrorMessage/>
        <App offers={offers} comments={comments} />
      </HistoryRoute>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
