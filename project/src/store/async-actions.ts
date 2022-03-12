import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {Offer} from '../types/offer';
import {APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR} from '../const';
import {loadOffers, redirectToRoute, requireAuthorization, setError, setUserEmail} from './action';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {dropToken, getToken, saveToken} from '../services/token';
import {errorHandle} from '../services/error-handle';

export const clearErrorAction = createAsyncThunk(
  'favorites/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Hotels);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const getUserEmail = createAsyncThunk(
  'user/getUserEmail',
  async () => {
    const {data: {email}} = await api.get(APIRoute.Login);
    store.dispatch(setUserEmail(email));
  }
);

export const checkAuthStatus = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Authorize));
      store.dispatch(getUserEmail());
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NotAuthorize));
    }
  }
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Authorize));
      store.dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NotAuthorize));
    }
  }
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NotAuthorize));
    } catch (error) {
      errorHandle(error);
    }
  }
)
