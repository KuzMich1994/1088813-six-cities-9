import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthStatus, fetchOffersAction} from './store/async-actions';
import HistoryRoute from './components/history-route/history-route';
import browserHistory from './browser-history';
import {AppRoute} from './const';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthStatus());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRoute history={browserHistory} basename={AppRoute.Root}>
        <ToastContainer/>
        <App/>
      </HistoryRoute>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
